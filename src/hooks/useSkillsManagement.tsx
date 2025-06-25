
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export interface Skill {
  id: string;
  name: string;
  verified: boolean;
  category: 'technical' | 'soft' | 'certification';
}

export interface Qualification {
  id: string;
  title: string;
  institution: string;
  verified: boolean;
  dateObtained?: string;
}

export const useSkillsManagement = (userId?: string) => {
  const { toast } = useToast();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [qualifications, setQualifications] = useState<Qualification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadSkills = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_skills')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      
      setSkills(data || []);
    } catch (error) {
      console.error('Error loading skills:', error);
      toast({
        title: "Error",
        description: "Failed to load skills",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadQualifications = async () => {
    if (!userId) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_qualifications')
        .select('*')
        .eq('user_id', userId);

      if (error) throw error;
      
      setQualifications(data || []);
    } catch (error) {
      console.error('Error loading qualifications:', error);
      toast({
        title: "Error",
        description: "Failed to load qualifications",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const addSkill = async (skillName: string, category: 'technical' | 'soft' | 'certification' = 'technical') => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('user_skills')
        .insert({
          user_id: userId,
          name: skillName,
          category,
          verified: false
        })
        .select()
        .single();

      if (error) throw error;

      setSkills(prev => [...prev, data]);
      toast({
        title: "Success",
        description: "Skill added successfully",
      });
    } catch (error) {
      console.error('Error adding skill:', error);
      toast({
        title: "Error",
        description: "Failed to add skill",
        variant: "destructive",
      });
    }
  };

  const removeSkill = async (skillId: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('user_skills')
        .delete()
        .eq('id', skillId)
        .eq('user_id', userId);

      if (error) throw error;

      setSkills(prev => prev.filter(skill => skill.id !== skillId));
      toast({
        title: "Success",
        description: "Skill removed successfully",
      });
    } catch (error) {
      console.error('Error removing skill:', error);
      toast({
        title: "Error",
        description: "Failed to remove skill",
        variant: "destructive",
      });
    }
  };

  const addQualification = async (qualification: Omit<Qualification, 'id' | 'verified'>) => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('user_qualifications')
        .insert({
          user_id: userId,
          title: qualification.title,
          institution: qualification.institution,
          date_obtained: qualification.dateObtained,
          verified: false
        })
        .select()
        .single();

      if (error) throw error;

      setQualifications(prev => [...prev, {
        id: data.id,
        title: data.title,
        institution: data.institution,
        verified: data.verified,
        dateObtained: data.date_obtained
      }]);
      
      toast({
        title: "Success",
        description: "Qualification added successfully",
      });
    } catch (error) {
      console.error('Error adding qualification:', error);
      toast({
        title: "Error",
        description: "Failed to add qualification",
        variant: "destructive",
      });
    }
  };

  const removeQualification = async (qualificationId: string) => {
    if (!userId) return;

    try {
      const { error } = await supabase
        .from('user_qualifications')
        .delete()
        .eq('id', qualificationId)
        .eq('user_id', userId);

      if (error) throw error;

      setQualifications(prev => prev.filter(qual => qual.id !== qualificationId));
      toast({
        title: "Success",
        description: "Qualification removed successfully",
      });
    } catch (error) {
      console.error('Error removing qualification:', error);
      toast({
        title: "Error",
        description: "Failed to remove qualification",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (userId) {
      loadSkills();
      loadQualifications();
    }
  }, [userId]);

  return {
    skills,
    qualifications,
    isLoading,
    addSkill,
    removeSkill,
    addQualification,
    removeQualification,
    refreshData: () => {
      loadSkills();
      loadQualifications();
    }
  };
};
