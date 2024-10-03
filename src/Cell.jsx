const Cell = ({id,turn,setturn,cells,setcells,start}) => {


    const HandleChange = (changeTo)=>{
        let CellsCopie = [...cells];
        CellsCopie[id] = changeTo
        setcells(CellsCopie)
    }
    const HandleClick = () => {
        let CellTaken = !!cells[id]
        if(!CellTaken){
            if(turn == "circle"){
                HandleChange("circle")
                setturn("cross")
            }else if(turn == "cross"){
                HandleChange("cross")
                setturn("circle")
            }
        }
    }
    const updateCell=()=>{
        
    }
/*     const cellsCopy = [...cells]
    console.log(cells.lastIndexOf("circle")) */
    
    return ( 
        <div style={cells[id]? (cells[id]=="cross"? {backgroundColor:"red",border:"solid #bbb 9px"}:{backgroundColor:"blue",border:"solid #bbb 9px"}):{}} onClick={start ? HandleClick : null} className="cell">{cells[id] ? (cells[id]== "circle"?"O":"X"):""}</div>
     );
}
 
export default Cell;