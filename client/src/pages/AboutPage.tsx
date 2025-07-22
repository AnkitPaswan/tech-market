import React from "react";

const AboutPage: React.FC = () => {
  return (
    <>
      <main className="container mx-auto px-4 py-16 min-h-[70vh] mt-12">
        <h1 className="text-3xl font-bold mb-8 text-center">About TechMarket</h1>
        <section className="max-w-4xl mx-auto text-gray-700 space-y-6">
          <p>
            Welcome to TechMarket, your number one source for all things tech. We're dedicated to giving you the very best of electronics, with a focus on quality, customer service, and uniqueness.
          </p>
          <p>
            Founded in 2023, TechMarket has come a long way from its beginnings. When we first started out, our passion for providing the best tech products drove us to start our own business.
          </p>
          <p>
            We hope you enjoy our products as much as we enjoy offering them to you. If you have any questions or comments, please don't hesitate to contact us.
          </p>
          <p>
            Sincerely,<br />
            The TechMarket Team
          </p>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
