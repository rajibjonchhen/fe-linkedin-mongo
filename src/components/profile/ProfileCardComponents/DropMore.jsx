import {GrFormEdit, GrDocument} from 'react-icons/gr'
import {RiShareForwardFill} from 'react-icons/ri'
import {FiDownload} from 'react-icons/fi'

export default function  DropMore ({profile}) {



    // const downloadPDF = async(e) => {
    //     try {
    //     const response = await fetch(`${process.env.REACT_APP_PROD_URL}/profiles/${profile._id}/downloadPdf`)
    //     if(response.ok){
    //         window.location.replace(`${process.env.REACT_APP_PROD_URL}/profiles/${profile._id}/downloadPdf`);
    //     }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    //   const downloadCSV = async(e) => {
    //     try {
    //         const response = await fetch(`${process.env.REACT_APP_PROD_URL}/profiles/${profile._id}/experiences/csv`)
    //         if(response.ok){    
    //         window.location.replace(`${process.env.REACT_APP_PROD_URL}/profiles/${profile._id}/experiences/csv`);
    //         }
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   };

    return (<>
         <ul className='list-unstyled'>
                                <li >
                                    <span className="mx-3"><RiShareForwardFill/></span>
                                    <span>Share Profile in a message</span>
                            </li>
                                <li >
                                    <span className="mx-3"><FiDownload/></span>
                                    <a  href={`${process.env.REACT_APP_PROD_URL}/profiles/${profile._id}/downloadPdf`}>
                                    <span >Save to pdf</span> 
                                    </a>
                                </li>
                                <li >
                                    <span className="mx-3"><GrDocument/></span>
                                    <a href={`${process.env.REACT_APP_PROD_URL}/profiles/${profile._id}/experiences/csv`}>
                                    <span className="text-left" >Build a resume</span>
                                    </a>
                                </li>
                            </ul>
    </>
    )
}