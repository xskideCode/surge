'use client';

const CategoryInput = ({ icon: Icon, label, selected, onClick }) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
        flex 
        flex-col 
        p-4
        border-b-2
        rounded-md
        gap-3
        feedback-card 
        transition
        cursor-pointer
        ${selected ? 'ring-2 ring-gray-300 ring-opacity-30 bg-black-gradient' : 'bg-zinc-700 bg-opacity-40'}
        ${selected ? 'border-b-slate-400' : 'border-transparent'}
      `}
    >
      <Icon size={30} />
      <div className="font-semibold">
        {label}
      </div>
      
    </div>
  )
}

export default CategoryInput