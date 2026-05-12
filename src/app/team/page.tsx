import React from 'react';
import {
    ExternalLink
} from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader
} from "@/components/ui/card";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BsGithub, BsLinkedin, BsTwitter } from 'react-icons/bs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface TeamMember {
    name: string;
    role: string;
    bio: string;
    imageUrl: string;
    department: string;
    socials: {
        twitter?: string;
        github?: string;
        linkedin?: string;
    };
}

const team: TeamMember[] = [
    {
        name: "Sarah Chen",
        role: "Engineering Director",
        department: "Engineering",
        bio: "Former Lead Architect at Vercel with 12+ years of experience in distributed systems.",
        imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
        socials: { twitter: "#", github: "#", linkedin: "#" }
    },
    {
        name: "Marcus Rodriguez",
        role: "Product Designer",
        department: "Design",
        bio: "Obsessed with micro-interactions and accessible design systems.",
        imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
        socials: { twitter: "#", linkedin: "#" }
    },
    {
        name: "Aisha Gupta",
        role: "Fullstack Developer",
        department: "Engineering",
        bio: "React and Node.js specialist. Open source contributor to Next.js.",
        imageUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
        socials: { github: "#", linkedin: "#" }
    },
    {
        name: "Julian Voss",
        role: "Marketing Head",
        department: "Growth",
        bio: "Scaling startups from 0 to 1M+ users through data-driven storytelling.",
        imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
        socials: { twitter: "#", linkedin: "#" }
    }
];

export default function TeamPage() {
    return (
        <>
            <Navbar/>
        <section className="container mx-auto py-24 px-4">
            <div className="text-center mb-16 space-y-4">
                <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
                    Meet our world-class team
                </h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                    We’re a diverse group of designers, engineers, and strategists
                    working together to build the future of the web.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {team.map((member) => (
                    <Card key={member.name} className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300 bg-secondary/20">
                        <CardHeader className="flex flex-col items-center pt-8">
                            <Avatar className="w-32 h-32 border-4 border-background">
                                <AvatarImage src={member.imageUrl} alt={member.name} className="object-cover" />
                                <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div className="text-center mt-4 space-y-1">
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-sm font-medium text-[#C8A558]">{member.role}</p>
                                <Badge variant="outline" className="mt-2 bg-background/50">
                                    {member.department}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="text-center pb-8">
                            <p className="text-sm text-muted-foreground mb-6 line-clamp-3">
                                {member.bio}
                            </p>
                            <div className="flex justify-center gap-2">
                                {member.socials.twitter && (
                                    <Button variant="ghost" size="icon" asChild className="h-9 w-9">
                                        <a href={member.socials.twitter}><BsTwitter className="h-4 w-4" /></a>
                                    </Button>
                                )}
                                {member.socials.github && (
                                    <Button variant="ghost" size="icon" asChild className="h-9 w-9">
                                        <a href={member.socials.github}><BsGithub className="h-4 w-4" /></a>
                                    </Button>
                                )}
                                {member.socials.linkedin && (
                                    <Button variant="ghost" size="icon" asChild className="h-9 w-9">
                                        <a href={member.socials.linkedin}><BsLinkedin className="h-4 w-4" /></a>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-20 text-center">
                <Button size="lg" className="rounded-full px-8">
                    Join our team <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
            </div>
            </section>
        <Footer/></>
    );
}