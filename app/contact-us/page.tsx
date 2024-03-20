import DetailPageBanner from "../components/DetailPageBanner";
import { BiMap } from "react-icons/bi";
import { BsPhone } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import Button from "../components/Button";

const contactInfos = [
  {
    icon: BiMap,
    desc: "Address: Unit 302, 23C Tong Dan, Ha Noi",
  },
  {
    icon: BsPhone,
    desc: "0986074833",
  },
  {
    icon: HiOutlineMail,
    desc: "vizmedia@gmail.com",
  },
];

const Contact = () => {
  return (
    <>
      <DetailPageBanner />
      <div className="flex gap-5 justify-between w-full mb-8">
        <div className="w-1/3 flex flex-col justify-center  px-4 gap-5">
          {contactInfos.map((contact, i) => (
            <div className="flex items-start gap-4">
              <contact.icon
                className="text-auth-btn border-2 border-auth-btn p-2 rounded-full"
                size={35}
              />
              <p>{contact.desc}</p>
            </div>
          ))}
          <form className="flex flex-col gap-5">
            <h3>Contact</h3>
            <input
              className="px-5 py-3 border-2 "
              type="text"
              placeholder="Fullname"
            />
            <input
              className="px-5 py-3 border-2"
              type="email"
              placeholder="Email"
            />
            <textarea
              className="px-5 py-3 border-2 max-h-32"
              placeholder="Content"
            />
            <div className="w-1/2">
              <Button fullWidth>Contact Us</Button>
            </div>
          </form>
        </div>
        <div className="w-2/3">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.5763895896935!2d105.76569107497912!3d20.96952018066509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134532788c02ba5%3A0xd483d102eacd7f58!2zQ1QxIE5nw7QgVGjDrCBOaOG6rW0!5e0!3m2!1sen!2s!4v1688789135568!5m2!1sen!2s"
            width="100%"
            height="100%"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </>
  );
};

export default Contact;
