"use client";
import Header from "@/components/store/Header";
import NavBar from "@/components/store/NavBar";

export default function layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <section className="container max-w-[50rem] mt-20">
                {children}
            </section>
            <NavBar />
        </>
    );
}
