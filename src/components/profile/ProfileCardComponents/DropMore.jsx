import {GrFormEdit, GrDocument} from 'react-icons/gr'
import {RiShareForwardFill} from 'react-icons/ri'
import {FiDownload} from 'react-icons/fi'

export default function  DropMore ({profile}) {



    const downloadPDF = (e) => {
        try {
          window.location.replace(`${process.env.REACT_APP_PROD_URL}/profiles/${profile._id}/downloadPdf`);
        } catch (error) {
          console.log(error);
        }
      };

      const downloadCSV = (e) => {
        try {
          window.location.replace(`${process.env.REACT_APP_PROD_URL}/profiles/${profile._id}/experiences/csv`);
        } catch (error) {
          console.log(error);
        }
      };

    return (<>
         <ul className='list-unstyled'>
                                <li >
                                    <span className="mx-3"><RiShareForwardFill/></span>
                                    <span>Share Profile in a message</span>
                            </li>
                                <li >
                                    <span className="mx-3"><FiDownload/></span>
                                  <span onClick={(e) => downloadPDF()}>Save to pdf</span> 
                                </li>
                                <li >
                                    <span className="mx-3"><GrDocument/></span>
                                 <span className="text-left" onClick={(e) => downloadPDF()}>Build a resume</span>
                                </li>
                            </ul>
    </>
    )
}