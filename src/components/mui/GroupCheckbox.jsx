import React, { useState, useEffect } from 'react';
import { Button  } from "@mui/material";

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    ochre: {
      main: '#e6a931',
      light: '#f3c05a',
      dark: '#dea022',
      contrastText: 'white',
    },
    white: {
      color: 'rgba(0, 0, 0, 0.26)',
      backgroundColor: 'rgba(0, 0, 0, 0.12)'
    },
  },
});
export const GroupCheckbox = ({parentMenu, childMenuList, callBack, checkEndabled = true}) => {

    const [checkboxList, setcheckboxList] = useState(null);
    const [isSelectAll, setisSelectAll] = useState(true);

    const handleSelectAll = (event) => {
        let newArr = [];
        checkboxList.forEach((item) => {
          item.enabled = event.target.checked;
          newArr.push(item);
        });

        setcheckboxList(newArr);
        setisSelectAll(isParentCheck(newArr));
        callBack(newArr);
    };

    const handleChange = (event) => {
        let newArr = [];
        checkboxList.forEach((item) => {
          if(item.menuCode === event.target.id) {
            item.enabled = !item.enabled;
          }
          newArr.push(item);
        });

        setcheckboxList(newArr);
        setisSelectAll(isParentCheck(newArr));
        callBack(newArr);
    };

    const handlebtnWrite = (event) => {
        let newArr = [];
        checkboxList.forEach((item) => {
          if(item.menuCode === event.target.id) {
            item.readWrite = !item.readWrite;
          }
          newArr.push(item);
        });

        setcheckboxList(newArr);
        callBack(newArr);
    };


    const isParentCheck = (dataList) => {
      let arry = [];
      dataList.forEach(item => {
        arry.push(item.enabled);
      });

      let checker = arry.every(v => v === true);
      return checker;
    }

    useEffect(() => {
      if (childMenuList.length > 0) {
        let arry = [];
        childMenuList.forEach(item => {
          arry.push(item);
        });
        setcheckboxList(arry);
        setisSelectAll(isParentCheck(arry));
      }
    }, [childMenuList]);
    
    const children = (
    <div style={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <ThemeProvider theme={theme}>
        {
          (childMenuList !== null && checkboxList !== null) ?
            childMenuList.map((menu, index) => (
              <div key={index} style={{display:'flex', justifyContent:'space-between'}}>
                <FormControlLabel
                  label={menu.menuName}
                  control={<Checkbox disabled={checkEndabled} id={checkboxList[index].menuCode} checked={checkboxList[index].enabled} onChange={handleChange} />}
                />
                {
                  (!checkEndabled) ?
                  <div>
                    <Button variant="contained" disabled={(checkboxList[index].readWrite) ? false : true} color="success" size="small" style={{margin:'10px', fontSize:'10px'}}>Read</Button>
                    <Button id={checkboxList[index].menuCode} onClick={handlebtnWrite} 
                    variant="contained"
                    disabled={!checkboxList[index].enabled} 
                    color={(checkboxList[index].readWrite) ? "ochre" : "white"} size="small" style={{margin:'10px', fontSize:'10px'}}>Write</Button>
                  </div>
                  :
                  <div>
                  <Button variant="contained" disabled={(checkboxList[index].readWrite) ? false : true} color="success" size="small" style={{margin:'10px', fontSize:'10px'}}>Read</Button>
                    <Button id={checkboxList[index].menuCode}
                    variant="contained"
                    disabled={!checkboxList[index].enabled} 
                    color={(checkboxList[index].readWrite) ? "ochre" : "white"} size="small" style={{margin:'10px', fontSize:'10px'}}>Write</Button>
                  </div>
                }
                
              </div>
            ))
            : <></>
        }
      </ThemeProvider>
    </div>
  );

  return (
    <div style={{width:'360px',paddingBottom:'25px'}}>
      {
        (checkboxList !== null) ? <div>
          <FormControlLabel style={{fontWeight:'600'}}
            label={parentMenu.menuName}
            control={
                <Checkbox disabled={checkEndabled}
                indeterminate={isSelectAll !== true}
                defaultChecked={isSelectAll}
                onChange={handleSelectAll}
                />
            }
            />
            {children}
        </div>
        : <></>
      }
    </div>
  );
}