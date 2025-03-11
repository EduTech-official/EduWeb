import gallery1 from './assets/gallery1.png';
import gallery2 from './assets/gallery2.png';

const Gallery2 = () => {
  const images = [
    "https://drive.google.com/thumbnail?id=13Kl2dDanyKtdJ7ulHzhKck3xQBITzMUa&sz=w1000",
    "https://drive.google.com/thumbnail?id=1Z5IMtSglNtXiTp0uGGurtF10ayMsI3fm&sz=w1000",
    "https://drive.google.com/thumbnail?id=1m0J-nFbbZ1uebK6uXYM0i1ADpgFLNo8W&sz=w1000",
    "https://drive.google.com/thumbnail?id=1grcgnh6gUydD5Oesrf2y_ULmJ-LG3YKz&sz=w1000",

    "https://drive.google.com/thumbnail?id=1UgBdFD9WXurneenqBwk2d_ZjpV8U9gYL&sz=w1000",
    "https://drive.google.com/thumbnail?id=1wxosjwLr_NSFUjH2faF_DZAXd6cEm--W&sz=w1000",
    "https://drive.google.com/thumbnail?id=15KuALg7KPMaWNsf9rn6gJcRRbERbAIg-&sz=w1000",
    "https://drive.google.com/thumbnail?id=1PBLNeVmjNAR1exgZw21jocJuWA9NZvE7&sz=w1000",

    "https://drive.google.com/thumbnail?id=1FMjVBKZYVHrEbqDmLsf0uUp3idmJun5J&sz=w1000", 
    "https://drive.google.com/thumbnail?id=1stuS_9uopMtKPhLqav06z1HQUHLODxnw&sz=w1000",
    "https://drive.google.com/thumbnail?id=1ZYLuiHZO5bXtS6TisJDlY9fR0ogTJhhU&sz=w1000",
    "https://drive.google.com/thumbnail?id=1Eme3oVHSsvD_8jsoS0BPCeSyfm4cZ4eG&sz=w1000",

    "https://drive.google.com/thumbnail?id=1cr05BCpWiNfephtgXG580JFA5s7XFmRn&sz=w1000",
    "https://drive.google.com/thumbnail?id=1Gk4ckT3dIjZBVtLd9CC0qDJuZ-tehuqM&sz=w1000",
    "https://drive.google.com/thumbnail?id=1cq3cOLXAlIL1CcPRi03SO1AG3J9BXozb&sz=w1000",
    "https://drive.google.com/thumbnail?id=1Ye2LDOFMpYAL2-G2JourbPHMcqqcLyFf&sz=w1000",

    "https://drive.google.com/thumbnail?id=1UHL6dYvigUKtr4pwyBWiB_YQS5g7mhqN&sz=w1000",
    "https://drive.google.com/thumbnail?id=1QTLq6APpQKqRuX1lKqTArpmldtrK9N3e&sz=w1000",
    "https://drive.google.com/thumbnail?id=1kCAvvydtPTTnAk1_l38gTAD7FMczxlvk&sz=w1000",
    "https://drive.google.com/thumbnail?id=1TbeM1px_v8fq0Eh4n3GMyR7KpN49gdSy&sz=w1000",

    "https://drive.google.com/thumbnail?id=1b5q6F8lTz-nlBLomlDPchEW_xtncTCyH&sz=w1000",
    "https://drive.google.com/thumbnail?id=1h0gH1hn0iR8QC5wem6uV9ckLlMLcvt7D&sz=w1000",
    "https://drive.google.com/thumbnail?id=160dFH4saFKdZjaZvVOE7Vky4qUDptmrj&sz=w1000",
    "https://drive.google.com/thumbnail?id=129khytxqagQry1l3RK3945OTEneBnflj&sz=w1000",

    "https://drive.google.com/thumbnail?id=18xuZpntRe1cWPQzpziJu2w9xZZvZ1Aq-&sz=w1000",
    "https://drive.google.com/thumbnail?id=1lS82tLa5ku5BQIgVBp7ZujHGWqqQvW0O&sz=w1000",
    "https://drive.google.com/thumbnail?id=1U4kRgvX6W-6SWoxUwLVLCs9mrn3Sr43f&sz=w1000",
    "https://drive.google.com/thumbnail?id=1C1JdB6_HnPPJfoqp6YiCY-CHqHY4edFU&sz=w1000",

    "https://drive.google.com/thumbnail?id=1stuS_9uopMtKPhLqav06z1HQUHLODxnw&sz=w1000",
    "https://drive.google.com/thumbnail?id=1Eme3oVHSsvD_8jsoS0BPCeSyfm4cZ4eG&sz=w1000",
    "https://drive.google.com/thumbnail?id=1Cc1LJGfgA7dLE2Rg-edRK_CCFuViS9zJ&sz=w1000",
    "https://drive.google.com/thumbnail?id=1co9BtUpL8zMwUXcO3LBND3mf3dMDPBu4&sz=w1000",
  ];

  return (
    <div>
      <div className="flex justify-center gap-4 mb-8">
        <img src={gallery1} alt="Gallery 1" className="w-1/2 rounded-md" />
        <img src={gallery2} alt="Gallery 2" className="w-1/2 rounded-md" />
      </div>
      <div className="pt-8 grid grid-cols-2 md:grid-cols-4 justify-center gap-x-2 gap-y-3 px-4">
        <div className="grid gap-y-4 gap-x-2 justify-center">
          {images.slice(0, 4).map((image, index) => (
            <div key={index}>
              <img className="h-auto max-w-full rounded-md" src={image} alt="" loading="lazy" />
            </div>
          ))}
        </div>
        <div className="grid gap-y-1">
          {images.slice(4, 8).map((image, index) => (
            <div key={index}>
              <img className="h-auto max-w-full rounded-md" src={image} alt="" />
            </div>
          ))}
        </div>
        <div className="grid gap-4 justify-center">
          {images.slice(8, 12).map((image, index) => (
            <div key={index}>
              <img className="h-auto max-w-full rounded-md" src={image} alt="" />
            </div>
          ))}
        </div>
        <div className="grid gap-4">
          {images.slice(12, 16).map((image, index) => (
            <div key={index}>
              <img className="h-auto max-w-full rounded-md" src={image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery2;
