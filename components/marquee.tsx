import Marquee from "react-fast-marquee";

export default function Marque({setValue}: {setValue: React.Dispatch<React.SetStateAction<string>>}) {

    const marquessData = [
        "A day without sunshine is like, you're drowning",
        "Life's too short to be alone",
        "Life's too short to be lonely",
        "Life's too short to be lonesome",
        "Life's too short to be lonesome",
        "You're not alone",
        "Day in a life of software engineers",
      ];

      const marqueeData2 = [
        "10x engagement in just 30 days",
        "Sarah increased her followers by 500%",
        "Mark's tweets now get 1000+ likes",
        "From 50 to 5000 followers this month", 
        "Content that actually converts",
        "LinkedIn posts that land job offers",
        "Emails that get 90% open rates",
        "Blogs that rank on page one",
        "Copy that closes deals"
      ];



  return (
    <div>
      <Marquee pauseOnHover direction="left">
         <Data marquessData={marqueeData2} setValue={setValue} />
      </Marquee>
    </div>
  );
}

function Data({ marquessData , setValue}: { marquessData: string[] , setValue: React.Dispatch<React.SetStateAction<string>>}) {

  return (
    <div className="flex gap-10 flex-wrap items-center mr-10 justify-center">
      {marquessData.map((marque, index) => (
        <div
          key={index}
          className="text-neutral-200 bg-neutral-500/10 hover:text-neutral-300/90 w-fit h-fit transition duration-150 cursor-pointer border rounded-full px-7 py-2 text-sm border-neutral-800"
        >
          <button onClick={() => setValue(marque)}>{marque}</button>
        </div>
      ))}
    </div>
  );
}