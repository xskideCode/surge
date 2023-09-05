'use client';

export const policies = [
  {
    id: "1.",
    p: "Your privacy is important to us. It is Surge Community’s policy to respect your privacy regarding any information we may collect from you across our website, https://www.connectnsurge.com, and other sites we own and operate.",
  }, 
  {
    id: "2.",
    p: "We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.",
  },
  {
    id: "3.",
    p: "We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.",
  },
  {
    id: "4.",
    p: "We don’t share any personally identifying information publicly or with third-parties, except when required to by law.",
  },
  {
    id: "5.",
    p: "Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies."
  },
  {
    id: "6.",
    p: "You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.",
  },
  {
    id: "7.",
    p: "You have the right to request access to, rectification or erasure of your personal data, or restriction of processing or object to processing of your personal data, in accordance with the Data Protection Act 2019. Please contact us if you wish to make any requests relating to your personal data.",
  },
  {
    id: "8.",
    p: "Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.",
  },
  {
    id: "9.", 
    p: "Surge community uses API services from Google to allow quick registration using your social network accounts. Surge community only collects your name/username profile picture and any linked youtube channel accounts to quickly personalize your account. You have the ability to delete your account in your account settings if you wish to discontinue using Surge community.",
  },
  {
    id: "10.", 
    p: "Surge Community's use and transfer to any other app of information received from Google APIs will adhere to <a href='https://developers.google.com/terms/api-services-user-data-policy' target='_blank' rel='noopener noreferrer' style='text-decoration: underline; color: #0070f3;'>Google API Services User Data Policy</a>, including the Limited Use requirements.",
  },
  {
    id: "11.",
    p: "This policy complies with the Data Protection Act 2019 of Kenya.",
  },
  {
    id: "12.",
    p: "This policy is effective as of 30 June 2023. Last updated: 19 August 2023.",
  },
]

const Policies = () => {
  return (
    <div className="pb-4">
        <h2 className='heading4'>Policies </h2>
        <hr />
        {policies.map((policy, i) => (
        <div key={i}>
        <p className='paragraph max-w-[90%] mt-5 md:px-0 px-2 xs:text-[14px] text-[13px]' dangerouslySetInnerHTML={{ __html: policy.id + ' ' + policy.p }}>
        </p>
      </div>
      ))}
    </div>
  )
}

export default Policies