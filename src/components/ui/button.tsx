function Button({ text, onClick, variant = "primary" }: {text: string; onClick?: ()=>void; variant?:string}) {
    return (
        <>
            <a type="button" className={`mt-2 btn btn-${variant} btn-outline-light fs-4 text-white`} role="button" onClick={onClick}>{text}</a>
        </>
    );
}
export default Button;