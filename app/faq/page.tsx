import DetailPageBanner from "../components/DetailPageBanner";

const section = [
  {
    title: "How do I find a book?",
    content:
      "You'll find results easily by typing a title, an author, an ISBN, a keyword or a tag that is relevant to what you are looking for (e.g. Travel, Japanese Literature, LGBT....) into the search bar at the top of our page. You can also browse the categories defined by Genres and Sub-genres, or narrow down results by using the filters (Price range, Format...). Happy browsing!",
  },
  {
    title: "How can I order books that are not available?",
    content:
      "If the books you need are not readily available, please send us a request on our Facebook page. Send us the title and condition you are looking for and we will provide a quotation accordingly, which is valid for 2 days since the query. You will be asked to make a deposit of 50% of the quotation value. Once the books arrive, we will inform you and send to your shipping address.",
  },
  {
    title: "How do I place an order?",
    content:
      "Currently, we accept orders on Facebook and Website. However, please be noted that only orders from Website are eligible for Reward Point Program. ",
  },
  {
    title: "What are the shipping rates/ delivery times?",
    content:
      "The shipping rate to your specific address could be found on the payment page once you enter the correct information. In general, transit time will take 1-2 days for Hanoi, and 3-5 days for other cities.",
  },
  {
    title: "What payment methods do you offer?",
    content:
      "We accept COD (Cash on Delivery), Bank transfer, VNPay and Momo. Please carefully read and follow the instruction on the payment page when you make the purchase. We also accept cash and credit card payments when you purchase at our location. ",
  },
];

const FAQ = () => {
  return (
    <>
      <DetailPageBanner />
      <div className="mx-auto max-w-screen-xl">
        <h1 className="text-5xl px-28 mb-5">FAQ</h1>
        {section.map((sec, i) => (
          <div key={i} className="flex flex-col gap-5 px-28 ">
            <div className="text-auth-btn text-xl">
              {i + 1}.{sec.title}
            </div>
            <p className="mb-5">{sec.content}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default FAQ;
