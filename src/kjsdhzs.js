import React, { useEffect, useState,useRef,Component } from 'react';
import { Button, Modal, ModalTitle,Table } from 'react-bootstrap'
import axios from 'axios'


export const Article = () => {
    var ipadresse="localhost"
    let componentRef = useRef();
    const [Data, setData] = useState([]);
    const [CAR, setCAR] = useState("");
    const [filter, setFilter] = useState("");

var idtest=''
var CodeA=''

var Filter=filter
var CodeA_Qnt=''
var Qntt=''
console.log("codeA now ",CodeA)
//var idtest=''
const [fullscreen, setFullscreen] = useState(true);
    const [DataFour, setDataFour] = useState([]);
    const [Four, setFour] = useState([]);
    const [Matricule, setMatricule] = useState("");
    const [Marge, setMarge] = useState("");


    const [Adresse, setAdresse] = useState("");
    const [Téléphone, setTéléphone] = useState(0);
    const [DataBS, setDataBS] = useState([]);
    const [DateBL, setDateBL] = useState();
    const [NUMBL, setNUMBL] = useState();
    const [Articles, setArticles] = useState([]);

    const [Date, setDate] = useState();
    const [RowData, SetRowData] = useState([])
    const [ViewShow, SetViewShow] = useState(false)
    const handleViewShow = () => { SetViewShow(true) }
    const hanldeViewClose = () => { SetViewShow(false) }
    //FOr Edit Model
    const [ViewEdit, SetEditShow] = useState(false)
    const handleEditShow = () => { SetEditShow(true) }
    const hanldeEditClose = () => { SetEditShow(false) }
    const [ViewListFour, SetListFour] = useState(false)
    const handleListFour = () => { SetListFour(true) }
    const hanldeListFourClose = () => { SetListFour(false) }
    const [ViewListQntFour, SetListQntFour] = useState(false)
    const handleListQntFour = () => { SetListQntFour(true) }
    const hanldeListQntFourClose = () => { SetListQntFour(false) }
    const [ViewEditFR, SetEditShowFR] = useState(false)
    const handleEditShowFR = () => { SetEditShowFR(true) }
    const hanldeEditCloseFR = () => { SetEditShowFR(false) }
    //FOr Delete Model
    const [ViewDelete, SetDeleteShow] = useState(false)
    const handleDeleteShow = () => { SetDeleteShow(true) }
    const hanldeDeleteClose = () => { SetDeleteShow(false) }
    //FOr Add New Data Model
    const [ViewPost, SetPostShow] = useState(false)
    const handlePostShow = () => { SetPostShow(true) }
    const hanldePostClose = () => { SetPostShow(false) }
    //FOr Add New Data Model
    const [ViewPostfour, SetPostShowfour] = useState(false)
    const handlePostShowfour = () => { SetPostShowfour(true) }
    const hanldePostClosefour = () => { SetPostShowfour(false) }
    const [ViewPostBL, SetPostShowBL] = useState(false)
    const handlePostShowBL = () => { SetPostShowBL(true) }
    const hanldePostCloseBL = () => { SetPostShowBL(false) }
    const [ViewPostBS, SetPostShowBS] = useState(false)
    const handlePostShowBS = () => { SetPostShowBS(true) }
    const hanldePostCloseBS = () => { SetPostShowBS(false) }
    //Define here local state that store the form Data
    const [fullName, setfullName] = useState("")
    const [email, setemail] = useState("")
    const [phoneNumber, setphoneNumber] = useState("")
    const [password, setpassword] = useState("")
    const [address, setaddress] = useState("")
    const [Delete,setDelete] = useState(false)
    //Id for update record and Delete
    const [id,setId] = useState("");
    const [row,setrow] = useState([]);
    //Define here local state that store the form Data
    const [fournisseur, setfournisseur] = useState("")
    const [Réference, setRéference] = useState("")
    const [PrixAchat, setPrixAchat] = useState("")
    const [PrixVente, setPrixVente] = useState("")
    const [Quantité, setQuantité] = useState(0)
    const [Vente, setVente] = useState("")
    const [idart, setidart] = useState("")
    const [CodeArticle, setCodeArticle] = useState("")
    const [CdArt, setCdArt] = useState("")
    const [Description, setDescription] = useState("")
    const [DescriptionBS, setDescriptionBS] = useState("")
  
    
    
   /************************************************************************************************************/
    /************************************************************************************************************/
    function GetArticlebyid ()  {
        //here we will get all employee data
        const url = `http://${ipadresse}:5001/Articlebyid/${idtest}`
        axios.get(url)
            .then(response => {
                CodeA=response.data.CodeArticle
                    console.log('CodeA in func',CodeA)
               console.log("article called",response.data.CodeArticle)
               GetFournisseurData()
            })
           
        }
    /************************************************************************************************************/
    /************************************************************************************************************/
    const GetArticles = () => {
        //here we will get all employee data
        const url = `http://${ipadresse}:5001/Article`
        axios.get(url)
            .then(response => {
                setData(response.data)
                    console.log(Data)
                
            })
            .catch(err => {
                console.log(err)
            })
        }
         /************************************************************************************************************/
    /************************************************************************************************************/
    const FilterByCodeArticle = () => {
        if(filter.length==0){
            GetArticles()
        }
        else{
    setData(Data.filter(dt=>dt.CodeArticle.includes(`${Filter}`)))
        console.log("data after filter",Data)
        console.log("filter",filter)
        }
        
    }
     /************************************************************************************************************/
    /************************************************************************************************************/
    const FilterByDescription = () => {
        if(filter.length==0){
            GetArticles()
        }
        else{
    setData(Data.filter(dt=>dt.Description.includes(`${Filter}`)))
        console.log("data after filter",Data)
        console.log("filter",filter)
        }
        
    }
/************************************************************************************************************/
 
  /************************************************************************************************************/
        const AddBS = () => {
            const url = `http://${ipadresse}:5001/add_BS`
            const Credentials = { CodeArticle, Description,fournisseur,Quantité}
            const urlA = `http://${ipadresse}:5001/Article/${CodeArticle}`
            axios.get(urlA)
            .then(response => {
                const result = response.data;
                setDescriptionBS(result.Description)                    
                   // window.location.reload()
                   console.log(DescriptionBS)
                
            })
            .catch(err => {
                console.log(err)
            })
        axios.post(url, Credentials)
        .then(response => {
            const result = response.data;
            const { status, message, data } = result;
            
            })}
            
/************************************************************************************************************/
/************************************************************************************************************/
               
 function GetFournisseurData  ()  {
    //here we will get all employee data
    const url = `http://${ipadresse}:5001/Fournisseur/`+CodeA
    axios.get(url)
        .then(response => {
            const result = response.data;
            setFour(result)
                console.log('url is ',url)
                console.log('car in req',CAR)
            console.log('Fournisseur called andworking')
            setCodeArticle(CodeA)
            setCodeArticle(CodeA)
            console.log("Codearticel when fr clled now",CodeArticle)
           
                
            
        })
        .catch(err => {
            console.log(err)
        })
        
}
/************************************************************************************************************/
    const handleSubmite = () => {
        const url = `http://${ipadresse}:5001/add_Article`
        const Credentials = { CodeArticle, Description}
        axios.post(url, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if ( response.status !== 200) {
                    alert("quelque chose s'est mal passé")
                }
                else {
                    alert("Succès")
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
           
    }
    /************************************************************************************************************/
    /************************************************************************************************************/
    const handleFourn = () => {
        const url = `http://${ipadresse}:5001/add_Fournisseur`
        const Credentials = { fournisseur,Matricule, Réference,Adresse, Téléphone,CodeArticle,Quantité,PrixAchat,PrixVente}
        axios.post(url, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message, data } = result;
                if ( response.status !== 200) {
                    alert("quelque chose s'est mal passé")
                }
                else {
                    alert("Succès")
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
        handleSubmite()}
    /************************************************************************************************************/
    
/****************************************************************************************************/            
    const handleEditFOUR = () =>{
        const url = `http://${ipadresse}:5001/EDITFOUR/${id}`
        const Credentials = { fournisseur, Réference, PrixAchat, PrixVente,Quantité,Vente }
        axios.put(url, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if ( response.status !== 200) {
                    alert("quelque chose s'est mal passé")
                }
                else {
                    alert("Succès")
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    
/************************************************************************************************************/
/****************************************************************************************************/            
    const handleEditArticle = () =>{
        const url = `http://${ipadresse}:5001/EDITART/${id}`
        const Credentials = { CodeArticle,Description }
        axios.put(url, Credentials)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if ( response.status !== 200) {
                    alert("quelque chose s'est mal passé")
                }
                else {
                    alert("Succès")
                    window.location.reload()
                }
            })
            
            .catch(err => {
                console.log(err)
            })
            const url1 = `http://${ipadresse}:5001/EDITFOURBYCA/${CodeA}`
            const Credentials1 = { CodeArticle }
            axios.put(url1, Credentials1)
                .then(response => {
                    const result = response.data;
                    const { status, message } = result;})
    }
    /************************************************************************************************************/
    
/************************************************************************************************************/   
 const handleDelete = () =>{
        const url = `http://${ipadresse}:5001/delete_Article/${id}`
        axios.delete(url)
            .then(response => {
                const result = response.data;
                const { status, message } = result;
                if ( response.status !== 200) {
                    alert("quelque chose s'est mal passé")
                }
                else {
                    alert("Succès")
                    window.location.reload()
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
/************************************************************************************************************/
const handleDeletefr = () =>{
    const url = `http://${ipadresse}:5001/delete_FR/${id}`
    axios.delete(url)
        .then(response => {
            const result = response.data;
            const { status, message } = result;
            if ( response.status !== 200) {
                alert("quelque chose s'est mal passé")
            }
            else {
                alert("Succès")
                window.location.reload()
            }
        })
        .catch(err => {
            console.log(err)
        })
}
/************************************************************************************************************/
    useEffect(() => {
        GetArticles();
       // GetFournisseurData()
   }, [])
  
    return (
        <div>

            <div>
            <div style={{color:'black',fontSize:"25px",marginLeft:"10px",fontFamily:"Times New Roman",fontWeight:"bold",marginTop:"4px"}}>Liste des articles
            <hr></hr>
            <Button style={{marginLeft:'400px',width:"100px",}} variant='dark' onClick={() => {handlePostShow()}}>
                    <b >Nouveau</b>
                    </Button>
                    
                    <Button style={{marginLeft:'200px',width:"100px",}} variant='dark' onClick={() => {window.location.reload()}}>
                    <b >Actualiser</b>
                    </Button>
                    <hr></hr>
                 </div>                   
                   
            </div>
            <div >
                <div className='table-responsive'>
                    <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th >Code Article<br/> 
                                <input type="text" className='form-control' onChange={(a) => setFilter(a.target.value)+FilterByCodeArticle()} placeholder="Filter" />

                                
                                </th>
                                <th >Description <br/>
                                <input type="text" className='form-control' onChange={(a) => setFilter(a.target.value)+FilterByDescription()} placeholder="Filter" />
                                </th>
                                <th>Quantité Stock</th>
                                <th>Vente</th>
                                <th>Fournisseur</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Data?.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.CodeArticle}</td>
                                    <td>{item.Description}</td>
                                 
                                    <td align='center'> <Button id='aj' size='sm' variant='dark'
                                     onClick={()=> {handleListQntFour( SetRowData(item),idtest=item._id,console.log('id',idtest),GetArticlebyid())}}>
                                         Afficher </Button></td>
                                      
                                    
                                    <td>{item.Description}</td>

                                    <td align='center'> <Button id='aj' size='sm' variant='dark'
                                     onClick={()=> {handleListFour( SetRowData(item),idtest=item._id,console.log('id',idtest),GetArticlebyid())}}>
                                         Afficher les fournisseurs</Button></td>


                                    <td style={{ minWidth: 190 }}>
                                       <center>
                                        <Button size='sm' variant='secondary' onClick={()=> {handleEditShow(SetRowData(item),setId(item._id),setCodeArticle(RowData.CodeArticle),setDescription(RowData.Description),CodeA=RowData.CodeArticle)}}>Modifier</Button>|
                                        <Button size='sm' variant='secondary' onClick={() => {handleViewShow(SetRowData(item),setId(item._id), setDelete(true))}}>Supprimer</Button>
                                        </center>
                                    </td>
                                    
                                </tr>
                            )}
                        </tbody>
                        
                    </table>
                   
                </div>
            </div>
            {/* View Modal */}
            <div className='model-box-view'>
                <Modal
                    show={ViewShow}
                    onHide={hanldeViewClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Supprimer Article</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.CodeArticle} readOnly />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' value={RowData.Description} readOnly />
                            </div>
                            
                            
                            
                               
                                    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDelete}>Supprimer</Button>
                        
                            
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='warning' onClick={hanldeViewClose}>Fermer</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* Modal for submit data to database */}
            <div className='model-box-view'>
                <Modal
                    show={ViewPost}
                    onHide={hanldePostClose}
                    backdrop="static"
                    keyboard={false}
                    size="lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Nouvel Article</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        

<Table>
                        <tr>
                                <th> 
                                Article
                            
                                 </th>
                                 <th>
                                 Fournisseur
                                 </th>
                             </tr> 
                            <tr>
                                <td> 
                                <input type="text" className='form-control' onChange={(e) => setCodeArticle(e.target.value)} placeholder="Code Article" />
                            
                                 </td>
                                 <td>
                                 <input type="text" className='form-control' onChange={(a) => setfournisseur(a.target.value)} placeholder="Fournisseur" />
                                 </td>
                             </tr>  
                             <tr>
                                 <td>
                                 <input type="email" className='form-control' onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                                 </td>
                                 <td>       
                                
                                <input type="text" className='form-control' onChange={(a) => setMatricule(a.target.value)} placeholder="Matricule" />
                                </td>
                                 </tr>
                            <tr>
                            
                               
                                <td>
                                <input type="text" className='form-control' onChange={(a) => setPrixAchat(a.target.value)} placeholder="Prix Achat" />
                                </td>

                                <td>
                                <input type="email" className='form-control' onChange={(a) => setRéference(a.target.value)} placeholder="Réference" />
                                </td>
                                
                            </tr>
                            <tr>
                            <td> <input type="text" className='form-control' onChange={(a) => setPrixVente(a.target.value)} placeholder="PrixVente" value={PrixVente}/></td>
                                <td> <input type="text" className='form-control' onChange={(a) => setTéléphone(a.target.value)} placeholder="Téléphone" /></td></tr>
                            
                                <tr>
                               
                                </tr>
                            
                           
                        
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button type='submit' className='btn btn-success mt-4' onClick={handleFourn}> Valider</Button>

                        <Button variant='warning' onClick={hanldePostClose}style={{marginTop:"25px"}}>Fermer</Button>
                    </Modal.Footer>
                </Modal>
                </div>
{/*****************************************************************************************************************/}

                <div className='model-box-view'>
                <Modal
                    show={ViewPostfour}
                    onHide={hanldePostClosefour}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Ajouter Fournisseur</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' onChange={(a) => setfournisseur(a.target.value)} placeholder="Fournisseur" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' onChange={(a) => setMatricule(a.target.value)} placeholder="Matricule fiscale" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' onChange={(a) => setRéference(a.target.value)} placeholder="Réference" />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(a) => setAdresse(a.target.value)} placeholder="Adresse" />
                            </div>
                           
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' onChange={(a) => setTéléphone(a.target.value)} placeholder="Téléphone" />
                            </div>
                            
                            
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button type='submit' className='btn btn-success mt-4' onClick={handleFourn}> Ajouter</Button>
                        <Button variant='warning' onClick={hanldePostClosefour}style={{marginTop:"25px"}}>Fermer</Button>
                    </Modal.Footer>
                </Modal>
                </div>

                
{/*****************************************************************************************************************/} 

{/*****************************************************************************************************************/}
{/*****************************************************************************************************************/} 

           {/* Modal for Edit employee record */}
            <div className='model-box-view'>
                <Modal
                    show={ViewEdit}
                    onHide={hanldeEditClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modifier Article</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className='form-group'>
                                <label>Name</label>
                                <input type="text" className='form-control' onChange={(e) => setCodeArticle(e.target.value)}  defaultValue={RowData.CodeArticle}/>
                            </div>
                            <div className='form-group mt-3'>
                                <label>Email</label>
                                <input type="email" className='form-control' onChange={(e) => setDescription(e.target.value)}  defaultValue={RowData.Description} />
                           </div>
                            <Button type='submit' className='btn btn-warning mt-4' onClick={handleEditArticle}>Valider</Button>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant='secondary' onClick={hanldeEditClose}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        
 {/*****************************************************************************************************************/} 

           {/* Modal for Edit employee record */}
           <div className='model-box-view'>
           <Modal
               show={ViewEditFR}
               onHide={hanldeEditCloseFR}
               backdrop="static"
               keyboard={false}
           >
               <Modal.Header closeButton>
                   <Modal.Title>Edit Fournisseur</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                   <div>
                       <div className='form-group'>
                           <label>Fournisseur</label>
                           <input type="text" className='form-control' onChange={(e) => setfullName(e.target.value)} placeholder="Fournisseur" defaultValue={RowData.fournisseur}/>
                       </div>
                       <div className='form-group mt-3'>
                           <label>Réference</label>
                           <input type="email" className='form-control' onChange={(e) => setemail(e.target.value)} placeholder="Réference" defaultValue={RowData.Réference} />
                       </div>
                       <div className='form-group mt-3'>
                           <label>Prix Achat</label>
                           <input type="text" className='form-control' onChange={(e) => setphoneNumber(e.target.value)} placeholder="Prix Achat" defaultValue={RowData.PrixAchat}/>
                       </div>
                      
                       <div className='form-group mt-3'>
                           <label>Prix Vente</label>
                           <input type="text" className='form-control' onChange={(e) => setaddress(e.target.value)} placeholder="Prix Vente" defaultValue={RowData.PrixVente}/>
                           </div>
                           <div>
                           <label>Quantité</label>
                           <input type="text" className='form-control' onChange={(e) => setaddress(e.target.value)} placeholder="Quantité" defaultValue={RowData.Quantité}/>
                       </div>
                       <div>
                           <label>Vente</label>
                           <input type="text" className='form-control' onChange={(e) => setaddress(e.target.value)} placeholder="Vente" defaultValue={RowData.Vente}/>
                       </div>
                       <Button type='submit' className='btn btn-warning mt-4' onClick={handleEditFOUR}>Edit Fournisseur</Button>
                   </div>
               </Modal.Body>
               <Modal.Footer>
                   <Button variant='secondary' onClick={hanldeEditCloseFR}>Close</Button>
               </Modal.Footer>
           </Modal>
       </div>
       {/*****************************************************************************************************************/}

<div className='model-box-view'>
                <Modal
                    show={ViewListFour}
                    onHide={hanldeListFourClose}
                    backdrop="static"
                    keyboard={false}
                    size='lg'
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Liste Fournisseur</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                        <table className=' responsivetable table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Fournisseur</th>
                                <th>Matricule fiscale</th>
                                <th>Prix achat</th>
                                <th>Prix Vente</th>
                                <th>Réference</th>
                                <th>Adresse</th>
                                <th>Téléphone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Four.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.fournisseur}</td>
                                    <td>{item.Matricule}</td>
                                    <td>{item.PrixAchat}</td>
                                    <td>{item.PrixVente}</td>
                                    <td>{item.Réference}</td>
                                    <td>{item.Adresse}</td>
                                    <td>{item.Téléphone}</td>
                                    <td>
                                        <Button size='sm' variant='secondary' onClick={()=> {handleEditShow(SetRowData(item),setId(item._id))}}>Modifier</Button>|
                                        <Button size='sm' variant='dark' onClick={() => {handleDeleteShow(SetRowData(item),setId(item._id))}}>Supprimer</Button>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    
                    <Button type='submit' className='btn btn-success mt-4' onClick={handlePostShowfour}> Ajouter</Button>

                        <Button variant='warning' onClick={hanldeListFourClose}style={{marginTop:"25px"}}>Fermer</Button>
                    </Modal.Footer>
                </Modal>
                       
                </div>

                
{/*****************************************************************************************************************/}
<div className='model-box-view'>
                <Modal
                    show={ViewListQntFour}
                    onHide={hanldeListQntFourClose}
                    backdrop="static"
                    keyboard={false}
                    size='lg'
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Quantité par Fournisseur</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                        <table className='table table-striped table-hover table-bordered'>
                        <thead>
                            <tr>
                                <th>Fournisseur</th>
                                
                                <th>Quantité</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Four.map((item) =>
                                <tr key={item._id}>
                                    <td>{item.fournisseur}</td>
                                    <td>{item.Qnt}</td>
                               </tr>
                            )}
                        </tbody>
                    </table>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                    
                  

                        <Button variant='warning' onClick={hanldeListQntFourClose}>Fermer</Button>
                    </Modal.Footer>
                </Modal>
                       
                </div>

                <div className='model-box-view'>
<Modal
    show={ViewDelete}
    onHide={hanldeDeleteClose}
    backdrop="static"
    keyboard={false}
    size={"lg"}
>
    <Modal.Header closeButton>
        <Modal.Title>
            Supprimer Fournisseur
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <div>
                            <div className='form-group'>
                                <input type="text" className='form-control' value={RowData.fournisseur} />
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control' value={RowData.Matricule}/>
                            </div>
                            <div className='form-group mt-3'>
                                <input type="email" className='form-control'value={RowData.Réference}/>
                            </div>
                           
                           
                            <div className='form-group mt-3'>
                                <input type="text" className='form-control' value={RowData.Téléphone}/>
                            </div>
                            
                            
                        </div>
 
                            
    </Modal.Body>
    <Modal.Footer>
    <Button type='submit' className='btn btn-danger mt-4' onClick={handleDeletefr}>Supprimer</Button>

        <Button variant='warning' onClick={hanldeDeleteClose}>Close</Button>
    </Modal.Footer>
</Modal>
</div>
                
{/*****************************************************************************************************************/} 
  </div> 
    );
};