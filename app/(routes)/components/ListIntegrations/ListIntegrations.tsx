import CustomIcon from '@/components/CustomIcon/CustomIcon'
import { List } from 'lucide-react'
import { TableIntegrations } from '../TableIntegrations'


export default function ListIntegrations() {
    return (
        <div className='shadow-sm bg-background rounded-lg p-5 flex-1'>
            <div className='flex gap-x-2 items-center'>
                <CustomIcon icon={List} />
                <p className='text-xl'>Lista de Integraciones</p>
            </div>
            <TableIntegrations />
        </div>
    )
}
