import FeedbackCard from "./FeedbackCard";
import { people01, people02, people03 } from "../assets";

const Testimonials = () => {
  const feedback = [
    {
      id: "feedback-1",
      content:
        "Money is only a tool. It will take you wherever you wish, but it will not replace you as the driver.",
      name: "Herman Jensen",
      title: "Founder & Leader",
      img: people01,
    },
    {
      id: "feedback-2",
      content:
        "Money makes your life easier. If you're lucky to have it, you're lucky.",
      name: "Steve Mark",
      title: "Founder & Leader",
      img: people02,
    },
    {
      id: "feedback-3",
      content:
        "It is usually people in the money business, finance, and international trade that are really rich.",
      name: "Kenn Gallagher",
      title: "Founder & Leader",
      img: people03,
    },
  ];

  return (
    <section
      id="clients"
      className="flex flex-col relative py-16 sm:py-24 lg:py-32 ml-12 sm:ml-24 sm:mt-10 lg:ml-32"
    >
      <div className="w-full flex justify-between items-center md:flex-row flex-col mb-6 relative z-10">
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <h2 className="text-5xl sm:text-6xl font-bold sm:p-10 leading-[4rem]">
            What People are <br className="sm:block hidden" /> saying about us
          </h2>
        </div>
        <div className="w-full md:w-1/2">
          <p className="text-left max-w-[450px] text-base sm:text-lg">
            Everything you need to accept card payments and grow your business
            anywhere on the planet.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center w-full feedback-container relative z-10 mt-12 sm:mt-0 -mx-4">
        {feedback.map((card) => (
          <div key={card.id} className="w-full sm:w-1/2 lg:w-1/3 px-4 ">
            <FeedbackCard {...card} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
