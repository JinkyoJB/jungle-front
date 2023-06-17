import MenuBarR from "../../components/Editor/MenuBarR";
import MenuBarL from "../../components/Editor/MenuBarL";
import Editor3 from "../../pages/Editor/Editor3"
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}°C`;
}

const dayData = ['2000-01-02', '2023-06-15']
var date = new Date(dayData[0]);
console.log((date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear());


const Practice3 =() => {
    return(
        <div>
            {/* <MenuBarR />
            <MenuBarL /> */}
            <Box sx={{ width: 300 }}>
                <Slider
                    aria-label="Small steps"
                    defaultValue={0.00000005}
                    getAriaValueText={valuetext}
                    step={0.00000001}
                    marks
                    min={-0.00000005}
                    max={0.0000001}
                    valueLabelDisplay="auto"
                />
        </Box>
        </div>
    )
}

export default Practice3;