import { Link } from "react-router-dom";


export default function Logo({
    isLink=true,
    imageClassName="",
    contClassName="",}) {

    return (
        <>
            <Link to={isLink?"/":"#"} className={`flex items-center gap-3 max-[420px]:items-center max-[420px]:flex-col flex-row ${contClassName}`}>
                <div className={`size-20 overflow-hidden ${imageClassName}`}>
                    <img 
                    src="/logos/ofppt.png" 
                    alt="OFPPT" 
                    className="size-full object-cover object-center"/>
                </div>
            </Link>
        </>
    )
}