'use client';

export const terms = [
  {
    id: "1.",
    name: "Terms",
    p: "By accessing the website at https://surgecomm.com, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site. The materials contained in this website are protected by applicable copyright and trademark law.",
  }, 
  {
    id: "2.",
    name: "Disclaimer",
    p: "The materials on Surge community's website are provided on an 'as is' basis. Surge community makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, Surge community does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.",
  },
  {
    id: "3.",
    name: "Limitations",
    p: "In no event shall Surge community or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Surge community's website, even if Surge community or a Surge community authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.",
  },
  {
    id: "4.",
    name: "Accuracy of materials",
    p: "The materials appearing on Surge community's website could include technical, typographical, or photographic errors. Surge community does not warrant that any of the materials on its website are accurate, complete or current. Surge community may make changes to the materials contained on its website at any time without notice. However Surge communtiy does not make any commitment to update the materials."
  },
  {
    id: "5.",
    name: "Links",
    p: "Surge community has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Surge community of the site. Use of any such linked website is at the user's own risk.",
  },
  {
    id: "6.",
    name: "Modifications",
    p: "Surge community may revise these terms of service for its website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.",
  },
  {
    id: "7.", 
    name: "Governing Law",
    p: "These terms and conditions are governed by and construed in accordance with the laws of Kenya and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.",
  },
  {
    id: "8.",
    name: "Refunds",
    p: "Given the nature of our digital services/products being instantly delivered and activated upon purchase, a refund is not guaranteed and is determined by your case unless required under relevant consumer protection laws.",
  },
]

const Terms = () => {
  return (
    <div className="pb-4">
        <h2 className='heading4'>Terms of Service</h2>
        <hr />
        {terms.map((term, i) => (
        <div key={i}>
        <h2 className='heading5 md:px-0 px-2'>{term.id} {term.name}</h2>
        <p className='paragraph max-w-[98%] md:px-0 px-2 xs:text-[14px] text-[13px]'>{term.p}
        </p>
      </div>
      ))}
    </div>
  )
}

export default Terms