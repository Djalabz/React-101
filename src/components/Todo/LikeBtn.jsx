import ThumbUpOffAlt from '@mui/icons-material/ThumbUpOffAlt'
import ThumbUpAlt from '@mui/icons-material/ThumbUpAlt'

import './LikeBtn.css'

function LikeBtn({ item, handleLike }) {
    return ( 
        <>
            {item.likes > 0 ? <div className='likes'>{item.likes}
            <ThumbUpAlt 
                sx={{ cursor: 'pointer', fontSize: '1.5' }} 
                onClick={() => handleLike(item.id)}/>
            </div>
            : <div className='likes'>{item.likes}
                <ThumbUpOffAlt 
                    sx={{ cursor: 'pointer', fontSize: '1.5' }} 
                    onClick={() => handleLike(item.id)}/>
            </div>}
        </>
    )
}

export default LikeBtn;