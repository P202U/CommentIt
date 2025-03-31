import './index.css';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
import { pink } from '@mui/material/colors';

function App() {
  return (
    <div>
      <div className="text-2xl font-bold text-amber-500">Hello world!</div>
      <div>
        <AccessAlarmIcon />
      </div>
      <div>
        <ThreeDRotation
          sx={{
            color: pink[500],
            fontSize: 40,
            marginTop: 3,
            border: '2px solid black',
            borderRadius: '50%',
            boxShadow: 3,
            '&:hover': {
              color: 'purple', // Change color on hover
              transform: 'scale(1.2)', // Enlarge icon on hover
            },
          }}
        />
      </div>
    </div>
  );
}

export default App;
