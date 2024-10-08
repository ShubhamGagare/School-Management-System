"use server"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@repo/ui";
import ClassViewLayoutClient from '../../../../components/clients/classView/ClassViewLayoutClient';
import { getlayouts, getListOfALLRegisters } from "../../../utils/utils";
import { registerType } from "components/clients/ListRegisterClient";

const page = async () => {
    const regData: registerType[] = await getListOfALLRegisters(new Date());

    const layoutList = await getlayouts()
    return (
        <div>
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
                            <BreadcrumbPage>Layout</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className='text-2xl font-bold tracking-tight '>Layout</div>
                <div className='flex space-x-4'>
                </div>
                
                <ClassViewLayoutClient layoutList={layoutList} />

            </div>
        </div>
    )
}

export default page
