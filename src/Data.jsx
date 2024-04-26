import { ArrowDownward, ArrowDropDown, InfoOutlined , InsertDriveFile, List} from '@mui/icons-material'
import React , {useEffect ,useState} from 'react'
import "./data.css" ;
import { db } from './firebase';

const Data = () => {
    const [files,setFiles] = useState([]) ;

    useEffect(()=>{
        db.collection("DRIVE").onSnapshot(snapshot =>{
            setFiles( snapshot.docs.map((doc =>({
                id:doc.id,
                data:doc.data() 
            }))))
        })
    },[])


    const handleDownload = (file) => {
     
        // using Java Script method to get PDF file
        fetch(file?.data?.fileURL).then((response) => {
            response.blob().then((blob) => {
             
                // Creating new object of PDF file
                const fileURL =
                    window.URL.createObjectURL(blob);
                     
                // Setting various property values
                let alink = document.createElement("a");
                alink.href = fileURL;
                alink.download = file?.data?.fileName;
                alink.click();
            });
        });
    };

    function FormatBytes(bytes,decimals =2 ){
        if(bytes === 0 ) return '0 Bytes' ;
        const k = 1024 ;
        const dm =decimals < 0 ? 0 :decimals ;
        const sizes = ['Bytes','KB','MB','GB','TB'];
        const i = Math.floor(Math.log(bytes)/Math.log(k) ) ;
        return parseFloat((bytes/Math.pow(k,i)).toFixed(dm) + ' ' + sizes[i] );
    }




  return (
    <div className='data'>
        <div className='data_header'>
             <div className='data_headerLeft'>
                <p>My Drive</p>
                <ArrowDropDown />
             </div>
             <div className='data_headerRight'>
                <List />
                <InfoOutlined />
             </div>
        </div>
       
        <div className='data_content'>
        <div className='data_grid'>
        {
            files.map((file)=>{
                return (
                    
                        <div className='data_file'>
                        <InsertDriveFile />
                        <p>{file.data.fileName}</p>
                        </div>
                )
            })
          }
        </div>   
        <div className='data_list'>
            <div className='detailsRow'>
                <p><b>Name <ArrowDownward /></b></p>
                <p><b>Last Modified </b></p>
                <p><b>File Size </b></p>
                <p><b><span class="material-symbols-outlined">
                Download
                </span></b></p>
        </div>
            <div className='content'>
           
            {
                files.map((file)=>{
                    return (
                        <div className='details_Row'>
                        <p id="p1"> 
                            <a href={file.data.fileURL} id="link">
                            <InsertDriveFile />   {file.data.fileName}
                            </a>                        
                        </p>
                        <p id="time">{new Date(file.data.timestamp?.seconds*1000).toUTCString()}</p>
                        <p id="size">{ FormatBytes(file.data.size) + ' '+'MB'}</p>
                        <p>
                            <b>
                                <a
                                    href={file.data.fileURL}
                                    target="_blank"    
                                    download={file.data.fileName}         
                                >
                                  
                                        <span 
                                        onClick={(file)=>{
                                            handleDownload(file) ;
                                        }}
                                        class="material-symbols-outlined">
                                            download
                                        </span>
                                    
                                </a>
                               
                            </b>
                        </p>
                        </div>
                    )
                })
            }
            </div>
         </div>
        </div>
     
    </div>
  )
}

export default Data ;
