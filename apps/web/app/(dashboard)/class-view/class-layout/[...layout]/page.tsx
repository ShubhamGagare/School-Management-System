import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator, Button, Label } from '@repo/ui';
import AddLayoutClient from '../../../../../components/clients/classView/LayoutClients/AddLayoutClient';
import { getlayout } from '../../../../utils/utils';

const page = async ({ params }: { params: { layout: string[] } }) => {
    console.log("params--->")
    console.log(params)

    const canvasType = params.layout[0]
    console.log("canvasType--->"+canvasType)

    const layoutId = params.layout[1]
    console.log("layoutId--->"+layoutId)

    const layout:any = await getlayout(Number(layoutId));
    console.log("layout--->"+JSON.stringify(layout))

    const desks:any = layout.desks
    console.log("desks--->"+JSON.stringify(desks))
    const props = {
        layout:layout,
        desks,
        canvasType
    }

  return (
    <div className="space-y-4">
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/class-view">Class View</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/class-view/class-layout">Layout</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>{canvasType==="edit"?"Edit":"Add"} layout</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>

        <div className='text-2xl font-bold tracking-tight '>Add layout</div>
        <div className='flex space-x-4'>
          <AddLayoutClient props={props} /> 
        </div>
        

    </div>

  )
}

export default page
