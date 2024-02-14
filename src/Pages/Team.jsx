
import TeamCards from "../components/TeamCards";
import "./../components/Scroll.css";

const Team = () => {
  const peeps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="m-5 p-1">
      <div className="container mx-6">
        <div className="col-span-3 text-left h-[80vh] my-10">
          <h2 className="text-md text-left text-white">DREAM</h2>
          <h1 className="text-6xl minmd:text-xl text-left tracking-widest bg-gradient-to-r  from-[#E61AA1]  to-[#0CF996] to-10% bg-clip-text text-transparent mb-3 mr-auto">
            TEAM
          </h1>
          <p className="text-stone-500 w-96 text-md minmd:text-sm minmd:w-60">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam
            veritatis fuga exercitationem nostrum repudiandae dolor et ducimus
            possimus temporibus omnis rerum vel officia quaerat, facere cum? A
            laudantium expedita assumenda.
          </p>
        </div>
        {/* <div className="col-span-2x"></div> */}
        <div className="field m-auto -translate-y-32">
          {/* <div class="mouse"></div> */}
          <a href="#Team">
            <div className="scroll"></div></a>
          {/* <div class="arrow"></div> */}
        </div>
      </div>
      <div id="Team" className=" my-4 flex flex-wrap justify-center ">
        {peeps.map((peep) => (
          <div key={peep} className="p-4 ">
            <TeamCards />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
