/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import axios from 'axios'
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../_helpers";

export function Topsales({ className, company,project, year, month, headers, api_url  }) {
  const [datas, setDatas] = React.useState([]);
 
  const get = async () => {
    const url = `${api_url}/api/sales/v1/topsales?company=${company}&project=${project}&year=${year}&month=${month}`;

    try {
      let response = await axios.get(url, headers);
      let data = response.data.data;
      
  
      setDatas(data);
   
    } catch (err) {}
  };
  React.useMemo(() => {
    get();
  }, [project, year, month]);
  return (
    <div className={`card card-custom `}>
   
   <div className="card-header pt-5 d-flex justify-content-center">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
           TOP SALES (UNIT)
          </span>
        
        </h3>
        
      </div>
     
      <div className="card-body py-0">
        {/* begin::Table */}
        <div className="table-responsive">
          <table
            className="table  table-vertical-center"
            id="kt_advance_table_widget_1"
          >
            <thead>
              <tr className="text-left font-weight-bold">
              <th  />
                <th className="pr-0" >
                  Nama
                </th>
        
                <th>Jumlah</th>
                <th >Value</th>
                
              </tr>
            </thead>
            <tbody>
             {datas.map((data, index)=>
             
             <tr key={index}>
           
             <td className="pr-0">
               <div className="symbol symbol-50 symbol-light mt-1">
                 <span className="symbol-label">
                   <SVG
                     src={toAbsoluteUrl("/media/svg/avatars/001-boy.svg")}
                     className="h-75 align-self-end"
                   ></SVG>
                 </span>
               </div>
             </td>
             <td className="pl-0">
               <p
                
                 className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
               >
                {data.name}
               </p>
              
             </td>
             <td>
               <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                 {data.jumlah}
               </span>
               
             </td>
             <td>
               <div className="d-flex flex-column w-100 mr-2">
                 <div className="d-flex align-items-center justify-content-between mb-2">
                   <span className=" mr-2 font-size-sm font-weight-bold">
                    {data.value}
                   </span>
                  
                 </div>
                 
               </div>
             </td>
            
            
           </tr>
             )}
            </tbody>
          </table>
        </div>
        {/* end::Table */}
      </div>
      {/* end::Body */}
    </div>
  );
}
