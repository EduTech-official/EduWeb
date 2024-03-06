// import React from "react";
import Globe from "../components/Gloabe";

const ContactPage = () => {
  return (
    <div className=" grid grid-cols-2">
      <section className="col-span-1 minlg:col-span-2">
        <div className="py-8 minlg:py-16 px-8 w-full">
          <h2 className="mb-4 text-2xl tracking-normal font-extrabold text-center brightness-150 bg-gradient-to-r from-[#0CF996]  to-[#E61AA1] bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="mb-8 minlg:mb-16 text-xs font-light text-center text-gray-500 dark:text-gray-400 minsm:text-sm">
            Got a issue? Want to send feedback about an Event ? Need details
            about our plan? Let us know.
          </p>
          <form
            method="POST"
            action="https://formsubmit.co/eduminerva.bvcoe@gmail.com"
            className="space-y-4"
          >
            <div>
              {/* <input type="hidden" name="_next" value="https://yourdomain.co/thanks.html"> */}
              <input
                type="email"
                id="email"
                name="email"
                className="block p-3 w-full text-sm bg-opacity-10 text-white bg-gray-50 rounded-lg border border-gray-300 shadow-sm"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="name"
                name="name"
                className="block p-3 w-full text-sm bg-opacity-10 text-white bg-gray-50 rounded-lg border border-gray-300 shadow-sm"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div className="minsm:col-span-2">
              <textarea
                id="message"
                name="message"
                rows="6"
                className="block p-2.5 h-1/6 w-full text-sm bg-opacity-10 text-white bg-gray-50 rounded-lg shadow-sm border border-gray-300 placeholder:text-zinc-400"
                placeholder="Leave a comment..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 minsm:w-fit hover:bg-primary-800 ring-2 ring-black focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Send message
            </button>
          </form>
        </div>
      </section>
      <div className="col-span-1 minlg:col-span-2">
        <Globe />
      </div>
    </div>
  );
};

export default ContactPage;
