import {GrFormEdit, GrDocument} from 'react-icons/gr'
import {RiShareForwardFill} from 'react-icons/ri'
import {FiDownload} from 'react-icons/fi'

export default function  DropMore ({profile}) {
    return (<>
         <ul className='list-unstyled'>
                                <li >
                                    <span className="mx-3"><RiShareForwardFill/></span>
                                    <span>Share Profile in a message</span>
                            </li>
                                <li >
                                    <span className="mx-3"><FiDownload/></span>
                                   <a href={`${process.env.REACT_APP_PROD_URL}/profiles/${profile._id}/downloadPdf`}> <span>Save to pdf</span> </a>
                                </li>
                                <li >
                                    <span className="mx-3"><GrDocument/></span>
                                   <a href={`${process.env.REACT_APP_PROD_URL}`} ><span className="text-left">Build a resume</span> </a>
                                </li>
                            </ul>
    </>
    )
}