import React from "react";

const Funfair = () => {
  return (
    <div className="min-h-screen text-white p-4 md:p-8 text-left">
      {/* Main Heading */}
      <div className="py-8 md:py-12">
        <h1 className="tracking-normal text-xl md:text-4xl font-bold bg-gradient-to-r from-[#E61AA1] to-[#0CF996] to-55% bg-clip-text text-transparent my-2 md:my-3">
          🎪 Funfair 3.0 — Let the Games Begin!
        </h1>
        <p className="text-stone-100 text-xs md:text-base mt-2 md:mt-4">
          Explosive fun awaits! 💥 EduMinerva proudly presents <strong>Funfair 3.0</strong> — 
          the ultimate campus fiesta packed with laughter, thrills, and unforgettable memories.
          Dive into a day of friendly competition, test your coordination, or just enjoy the
          sheer joy of playing with friends. Every moment promises excitement you won’t want to miss!
        </p>
        <p className="text-stone-100 text-xs md:text-base mt-4">
          Round up your crew, pick your games, and let the energy take over! 🎉
        </p>
      </div>

      {/* Event Details */}
      <div className="mt-8 md:mt-12">
        <h2 className="tracking-normal text-lg md:text-3xl font-bold bg-gradient-to-r from-[#E61AA1] to-[#0CF996] to-55% bg-clip-text text-transparent my-4 md:my-6">
          🗓️ Event Details
        </h2>
        <ul className="space-y-2 text-stone-100 text-xs md:text-base">
          <li><strong>Date:</strong> 9 September 2026</li>
          <li><strong>Time:</strong> 3:00 PM – 5:00 PM</li>
          <li><strong>Venue:</strong> Ground and Basketball Court</li>
          <li><strong>Entry Fees:</strong></li>
          <ul className="ml-6 list-disc">
            <li>3 game – ₹30</li>
            <li>All 6 games – ₹50</li>
          </ul>
        </ul>
      </div>

      {/* Games Line-Up */}
      <div className="mt-8 md:mt-12">
        <h2 className="tracking-normal text-lg md:text-3xl font-bold bg-gradient-to-r from-[#E61AA1] to-[#0CF996] to-55% bg-clip-text text-transparent my-4 md:my-6">
          🎯 The Games Line-Up
        </h2>
        <ul className="space-y-4 text-stone-100 text-xs md:text-base">
          <li>
            🏃‍♀️ <strong>Three-Legged Race:</strong> Two players, one goal — and one leg tied together!
            This hilarious race tests your teamwork, coordination, and balance as you and your partner
            dash (or stumble!) toward the finish line.
          </li>
          <li>
            🎶 <strong>Musical Chairs:</strong> A timeless classic! Walk around the chairs as the music plays — 
            but when it stops, move fast! There’s always one less chair, so stay sharp and stay seated!
          </li>
          <li>
            📰 <strong>Newspaper Dance:</strong> Dance partners, this one’s for you! Dance together on a sheet of newspaper —
            but every time the music stops, fold it smaller. Keep your balance and avoid touching the ground!
          </li>
          <li>
            🕵️‍♀️ <strong>Find the Item:</strong> Channel your inner detective in this fast-paced scavenger hunt! 
            Locate hidden items scattered around — the fastest wins!
          </li>
          <li>
            🐾 <strong>Tail Tag:</strong> Run, dodge, and defend your “tail”! Grab as many as you can while protecting your own — 
            a thrilling mix of speed and strategy.
          </li>
          <li>
            🔥 <strong>The Floor is Lava:</strong> When someone yells “The floor is lava!”, jump onto something that’s not the floor.
            Quick reflexes and creativity will keep you safe!
          </li>
        </ul>
      </div>

      {/* Why Attend */}
      <div className="mt-8 md:mt-12">
        <h2 className="tracking-normal text-lg md:text-3xl font-bold bg-gradient-to-r from-[#E61AA1] to-[#0CF996] to-55% bg-clip-text text-transparent my-4 md:my-6">
          💫 Why You Shouldn’t Miss It
        </h2>
        <p className="text-stone-100 text-xs md:text-base">
          Funfair 3.0 is all about breaking the routine, connecting with friends, 
          and embracing a little friendly chaos. Expect laughter, light-hearted competition, 
          and memories you’ll be talking about long after the day ends.
        </p>
        <p className="text-stone-100 text-xs md:text-base mt-4">
          So bring your energy, your friends, and your game face — because 
          <strong> Funfair 3.0 </strong> is here to remind us all that college life is meant to be fun! 🎈
        </p>
      </div>
    </div>
  );
};

export default Funfair;
