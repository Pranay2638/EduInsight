interface Props {

    title: string;

    subtitle: string;

}

export default function PageHeader({

    title,

    subtitle

}: Props) {

    return (

        <div className="mb-8">

            <h1
                className="
                text-3xl
                font-bold
                text-slate-900
                dark:text-slate-100
                "
            >
                {title}
            </h1>

            <p
                className="
                mt-2
                text-slate-800
                dark:text-slate-300
                "
            >
                {subtitle}
            </p>

        </div>

    );

}