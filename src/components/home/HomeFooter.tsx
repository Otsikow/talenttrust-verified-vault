
const HomeFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <img src="/lovable-uploads/2c6e0c31-9b9d-41e7-8a6c-71bbba71fe34.png" alt="TrustTalent Logo" className="h-6 w-6" />
            <span className="text-lg font-semibold">TrustTalent</span>
          </div>
          <p className="text-gray-400 text-center sm:text-left text-sm">
            © 2025 TrustTalent. Powered by TrustTalent Engine.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
