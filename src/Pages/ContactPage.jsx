import Globe from "../components/Gloabe";
import SpecularButton from "../components/reactbits/SpecularButton";

const fieldClasses =
  "w-full rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-[15px] text-white " +
  "placeholder:text-slate-400 shadow-inner outline-none transition " +
  "focus:border-[#0CF996]/60 focus:bg-white/[0.07] focus:ring-2 focus:ring-[#0CF996]/30";

const ContactPage = () => {

  // Flex + items-center vertically centres the content. Previously the block was
  // top aligned inside a tall min-height, which dumped all the leftover room at
  // the bottom as dead space, most visible when zoomed out.
  return (
    <div className="relative flex min-h-[calc(100svh-5rem)] w-full items-center overflow-hidden">
      {/* Page level background. Sits behind the content, never intercepts clicks. */}

      {/* Centred, width capped container. Padding scales with the viewport so the
          content never touches the edge on a phone or drift apart on a wide screen. */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
        <header className="mx-auto max-w-2xl text-center">
          <h1 className="bg-gradient-to-r from-[#0CF996] to-[#E61AA1] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent brightness-150 sm:text-4xl">
            Contact Us
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-300/80 sm:text-base">
            Got an issue? Want to send feedback about an event? Need details about
            our plans? Let us know.
          </p>
        </header>

        {/* items-stretch (the default) so the globe column takes its height from
            the form row, which is how the original layout sized it. */}
        <div className="mt-10 grid gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-12">
          {/* Form. Plain card on purpose: the animated BorderGlow that was here
              pooled colour into one corner and read as a rendering artefact.
              The glow now belongs to the submit button alone. */}
          <div className="w-full rounded-3xl border border-white/10 bg-[rgba(9,13,22,0.82)] shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-md">
            <form
              method="POST"
              action="https://formsubmit.co/eduminerva.bvcoe@gmail.com"
              className="flex flex-col gap-4 p-5 text-left sm:p-7"
            >
              <div>
                <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-slate-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  className={fieldClasses}
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="name" className="mb-1.5 block text-xs font-medium text-slate-300">
                  Subject
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className={fieldClasses}
                  placeholder="Let us know how we can help you"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1.5 block text-xs font-medium text-slate-300">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className={`${fieldClasses} resize-y min-h-[120px]`}
                  placeholder="Leave a comment..."
                />
              </div>

              {/* Centred at every width, not left aligned on desktop. */}
              <div className="mt-2 flex justify-center">
                <SpecularButton
                  type="submit"
                  size="lg"
                  radius={14}
                  textColor="#f8fafc"
                  baseColor="#0f172a"
                  lineColor="#0CF996"
                  tint="#0CF996"
                  tintOpacity={0.06}
                  intensity={1.15}
                  className="w-full max-w-[340px] whitespace-nowrap"
                >
                  Send message
                </SpecularButton>
              </div>
            </form>
          </div>

          {/* Globe: close to its original proportions, nudged up a step. It still
              stretches with the row on desktop, the min-heights just set the
              floor. The Globe component itself stays untouched. */}
          {/* No min-height on desktop: the grid row is items-stretch, so this
              column takes exactly the form's height and the globe ends up the
              same size as the contact card. No sm: step here on purpose, because
              tailwind.config.js declares screens largest-first, so Tailwind emits
              sm (639px) AFTER lg (1023px) and sm wins at desktop widths. */}
          <div className="order-first min-h-[300px] w-full lg:order-none lg:min-h-0">
            <Globe />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
