import MobileNav from "@/components/shared/MobileNav";
import SideBar from "@/components/shared/sidebar";


export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main className="root">
            <SideBar />
            <MobileNav />
            <div className="root-container">
                <div className="wraper">
                    {children}
                </div>
            </div>

        </main>
    );
}
