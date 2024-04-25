import { ColorRing } from 'react-loader-spinner'

function Loader() {
    return ( 
        <div className='fallback mt-12 mx-auto w-screen flex justify-center'>
            <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={['#ced7f0', '#1e2357', '#d95763', '#8496b1', '#84cab1']}
            />
        </div>
    )
}

export default Loader;