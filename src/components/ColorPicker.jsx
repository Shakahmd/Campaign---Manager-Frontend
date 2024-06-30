import React,{useState,useEffect} from 'react'
import {ChromePicker} from 'react-color'

const ColorPicker = ({onColorChange}) => {
    const [color,setColor] = useState('#000000')
    useEffect(() => {
      setColor('#000000');
    }, []);
    const handleColorChange = (color) => {
     
      setColor(color.hex);
      onColorChange(color.hex)
    };
  return (
    <div>
      <ChromePicker color={color} onChange={handleColorChange} disableAlpha/>
      <input type="text"value={color} onChange={handleColorChange} className='mt-3 border border-gray-300' />
     
    </div>
  )
}

export default ColorPicker




