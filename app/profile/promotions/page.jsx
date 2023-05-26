import PromotionsTable from "@components/profile/promotionsTable"

const UserPromotions = () => {
  return (
    <div className='flex flex-col gap-8 w-[90vw] overflow-x-auto scrollbar-none  justify-center p-4'>
       <div>
        <PromotionsTable />
       </div>
    </div>
  )
}

export default UserPromotions