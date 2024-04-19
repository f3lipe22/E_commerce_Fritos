

const Alerta = ({alerta}) => {
  return (
<div
  style={{
    background: alerta.error ? '#D61212' : '#0FAF1E',
    textAlign: 'center',
    padding: '0.7rem',
    borderRadius: '1rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '15px',
    marginTop: '1rem',
    width:'400px',
    color: alerta.error ? 'white' : 'white',
    margin: '0 auto',
    marginBottom: '20px',
  }}
>
  {alerta.msg}
</div>



    
  )
}

export default Alerta