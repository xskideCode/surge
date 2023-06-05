import React from 'react'

const Socials = ({ label, link, user, org, icon: Icon}) => {
  return (
    <div 
     className={`
      text-white
        object-contain
        cursor-pointer
        hover:scale-125
        ${org ? 'opacity-100' : ((user && user[label]) ? ((user[label] !== '') ? 'opacity-100' : 'opacity-30') : 'opacity-30') }
     `}
     onClick={() => {
      if (user && user[label]) {
      const url = `https://www.${label}.com/${user[label]}`;
      window.open(url, '_blank')};
    }}
    >
      <Icon size={18} />
      
    </div>
  )
}

export default Socials