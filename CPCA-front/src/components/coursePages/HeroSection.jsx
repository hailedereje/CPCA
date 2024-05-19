const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center h-96" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80")' }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto h-full flex flex-col justify-center items-center text-center text-white">
        <h2 className="text-4xl font-bold mb-4">Transforming Lives, Building Independence</h2>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
          Start Your Free Trial
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
