import TeamCards from "../components/TeamCards";
import "./../components/Scroll.css";
import teams from "../Config/Team";

const Team = () => {
  // const peeps = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="m-2 minmd:m-0 ">
      <div className=" lg:mx-2 minlg:mx-3">
        <div className="col-span-3 text-left h-[80vh] my-10">
          <h2 className="text-md text-left text-white">DREAM</h2>
          <h1 className="text-6xl minmd:text-xl font-semibold font-IBMplex text-left tracking-widest bg-gradient-to-r  from-[#E61AA1]  to-[#0CF996] to-10% bg-clip-text text-transparent mb-3 mr-auto">
            TEAM
          </h1>
          <p className="text-stone-500 w-96 text-clamp font-IBMplex lg:p-4 minmd:w-fit mr-4 overflow-x-auto">
            Introducing our EduMinerva team: a visionary leader as President,
            highly skilled heads, and hardworking executives creating a
            development-minded environment. The President, highly goal-oriented,
            encourages everyone with meticulous planning. Vice-Presidents bring
            vast experience and positive attitudes. Joint Secretaries are gifted
            individuals with innovative minds. The President of Edu Tech leads
            by example. Treasurers handle financial affairs perfectly. Technical
            and Creative leads add crucial dimensions. Department heads,
            alongside members, work tirelessly to achieve targets.
          </p>
        </div>
        {/* <div className="col-span-2x"></div> */}
      </div>
      <div className="field m-auto -translate-y-[6rem] minlg:-translate-y-14">
        {/* <div class="mouse"></div> */}
        <a href="#Team">
          <div className="scroll"></div>
        </a>
        {/* <div class="arrow"></div> */}
      </div>
      <div id="Team" className=" my-4 flex flex-wrap justify-center ">
        {teams.map((team) => (
          <div key={team.teamName} className="">
            <h1 className="text-white text-2xl font-mono left-0 ">
              {team.teamName}
            </h1>

            <div className="flex flex-wrap m-4 gap-3">
              {team.members.map((member) => (
                <TeamCards
                  key={member.name}
                  PicLink={member.picLink}
                  Name={member.name}
                  Position={member.designation}
                  InstaLink={member.instagram}
                  LinkdLink={member.linkedin}
                  // To be uncommented when these are available
                />
              ))}
            </div>
            <br />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
