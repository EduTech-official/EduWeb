import { lazy, Suspense, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import SpecularButton from "../components/reactbits/SpecularButton";

const Globe = lazy(() => import("../components/Gloabe")); // <- double-check this path/filename

const fieldClasses =
  "w-full rounded-md border border-white/10 bg-white/[0.035] " +
  "px-3 text-[14px] text-white placeholder:text-slate-500 " +
  "outline-none transition-all duration-300 " +
  "focus:border-[#0CF996]/50 focus:bg-white/[0.08] focus:shadow-[0_0_15px_rgba(12,249,150,0.15)]";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 20,
      filter: { type: "tween", duration: 0.4, ease: "easeOut" },
    },
  },
};

const globeVariants = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
  visible: {
    opacity: 0.8,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.2, ease: "easeOut", delay: 0.3 },
  },
};

const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState(null);
  const formRef = useRef(null);
  const isMountedRef = useRef(true);
  const timeoutRef = useRef(null);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

const handleSubmit = async (e) => {
  e.preventDefault();
  if (isSubmitting) return;

  setError(null);
  setIsSubmitting(true);

  const formData = new FormData(formRef.current);

  try {
    const res = await fetch(
      "https://formsubmit.co/ajax/eduminerva.bvcoe@gmail.com",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      }
    );

    if (!res.ok) {
      throw new Error(`Submission failed with status ${res.status}`);
    }

    const data = await res.json();
    if (data?.success === false || data?.success === "false") {
      throw new Error(data?.message || "Submission was rejected");
    }

    // Let the flip animation (0.8s) finish, then show "Sent"
    timeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;
      setIsSent(true);
      formRef.current?.reset();

      // Briefly show "Sent", then flip back and unlock the form
      timeoutRef.current = setTimeout(() => {
        if (!isMountedRef.current) return;
        setIsSubmitting(false);
        setIsSent(false);
      }, 500); // <- how long "Message Sent!" stays visible
    }, 800); // <- matches the flip transition duration below
  } catch (err) {
    console.error("Submission failed", err);
    if (!isMountedRef.current) return;
    setError("Something went wrong. Please try again.");
    setIsSubmitting(false);
  }
};
  return (
    <main className="relative mx-auto grid min-h-[calc(100dvh-64px)] max-w-6xl grid-cols-1 items-center gap-12 overflow-x-hidden py-10 px-4 lg:grid-cols-2 lg:py-0">
      <section className="relative z-10 w-full max-w-[420px] justify-self-center lg:justify-self-end lg:pr-8">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0CF996]/[0.03] blur-3xl" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ willChange: "transform, opacity, filter" }}
          className="
            relative
            rounded-2xl
            border border-white/10
            bg-[#090d16]/80
            p-6
            backdrop-blur-md
            shadow-[0_16px_45px_rgba(0,0,0,0.45)]
          "
        >
          <motion.header variants={itemVariants} className="mb-6 text-center">
            <h1
              className="
                bg-gradient-to-r
                from-[#0CF996]
                to-[#E61AA1]
                bg-clip-text
                text-[26px]
                font-bold
                leading-tight
                text-transparent
              "
            >
              Get in touch
            </h1>
            <p className="mt-2 text-[13px] leading-tight text-slate-400">
              Questions, feedback, or an issue? Let us know.
            </p>
          </motion.header>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className={`space-y-4 ${isSubmitting ? "pointer-events-none" : ""}`}
          >
            <motion.div variants={itemVariants}>
              <label htmlFor="email" className="mb-1.5 block text-[13px] font-medium text-slate-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                className={`${fieldClasses} h-[40px]`}
                required
                readOnly={isSubmitting}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="subject" className="mb-1.5 block text-[13px] font-medium text-slate-300">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                placeholder="What can we help with?"
                className={`${fieldClasses} h-[40px]`}
                required
                readOnly={isSubmitting}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <label htmlFor="message" className="mb-1.5 block text-[13px] font-medium text-slate-300">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Write your message..."
                className={`${fieldClasses} h-[100px] resize-none py-2.5`}
                required
                readOnly={isSubmitting}
              />
            </motion.div>

            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-[12px] text-red-400"
              >
                {error}
              </motion.p>
            )}

            <motion.div variants={itemVariants} className="pt-2">
              <div className="relative h-[46px] w-full [perspective:1000px]">
                <motion.div
                  className="relative h-full w-full [transform-style:preserve-3d] [transform:translateZ(0)]"
                  animate={
                    isSubmitting
                      ? { rotateX: 180, scale: [1, 0.85, 1] }
                      : { rotateX: 0, scale: 1 }
                  }
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    times: [0, 0.5, 1],
                  }}
                  style={{ willChange: "transform" }}
                >
                  <div
                    className={`absolute inset-0 [backface-visibility:hidden] ${
                      isSubmitting ? "pointer-events-none" : ""
                    }`}
                  >
                    <SpecularButton
                      type="submit"
                      size="lg"
                      radius={9}
                      textColor="#f8fafc"
                      baseColor="#0f172a"
                      lineColor="#0CF996"
                      tint="#0CF996"
                      tintOpacity={0.04}
                      intensity={1}
                      className="h-full w-full !py-0 !text-[14px] font-medium transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Send message
                    </SpecularButton>
                  </div>

                  <div
                    className="
                      absolute inset-0
                      flex flex-col items-center justify-center
                      rounded-[9px] border border-[#0CF996]/40
                      bg-[#0f172a] shadow-[0_0_20px_rgba(12,249,150,0.15)]
                      [backface-visibility:hidden] [transform:rotateX(180deg)]
                    "
                  >
                    <span className="bg-gradient-to-r from-[#0CF996] to-[#E61AA1] bg-clip-text text-[15px] font-bold tracking-wide text-transparent">
                      {isSent ? "Message Sent!" : "Sending..."}
                    </span>
                    {!isSent && (
                      <span className="mt-0.5 text-[10px] text-slate-400">
                        Please wait...
                      </span>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </form>
        </motion.div>
      </section>

      <motion.div
        variants={globeVariants}
        initial="hidden"
        animate="visible"
        style={{ willChange: "transform, opacity, filter" }}
        className="pointer-events-none relative hidden h-[500px] w-full items-center justify-center lg:flex lg:justify-self-start"
      >
        <div className="absolute h-[350px] w-[350px] rounded-full bg-gradient-to-tr from-[#0CF996]/5 to-[#E61AA1]/10 blur-[80px]" />

        <Suspense fallback={<div className="h-[240px] w-[240px]" />}>
          <Globe />
        </Suspense>
      </motion.div>
    </main>
  );
};

export default ContactPage;