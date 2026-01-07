import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Seed Research Areas
  const researchAreas = await Promise.all([
    prisma.researchArea.create({
      data: {
        title: 'Underwater Acoustic Communication',
        description: 'JANUS protocol, IoUT, VLC-UWA hybrid systems',
        icon: 'Radio',
        order: 1,
      },
    }),
    prisma.researchArea.create({
      data: {
        title: 'AI/ML for Communication',
        description: 'Channel estimation, LLM, deep learning applications',
        icon: 'Brain',
        order: 2,
      },
    }),
    prisma.researchArea.create({
      data: {
        title: 'IoT & Sensor Networks',
        description: 'Mine monitoring, smart agriculture, WSN',
        icon: 'Wifi',
        order: 3,
      },
    }),
    prisma.researchArea.create({
      data: {
        title: '6G & Emerging Technologies',
        description: 'Channel modeling, terahertz, V2V communication',
        icon: 'Lightbulb',
        order: 4,
      },
    }),
  ]);

  console.log('Created research areas:', researchAreas.length);

  // Seed Funding
  const funding = await Promise.all([
    prisma.funding.create({
      data: {
        title: 'PRISM Funding',
        agency: 'DSIR, Govt. of India',
        via: 'IIT Kharagpur',
        year: '2024',
        color: 'text-purple-400',
      },
    }),
    prisma.funding.create({
      data: {
        title: 'MeitY TIDE Fund',
        agency: 'Ministry of Electronics and IT',
        via: 'SINE IIT Bombay',
        year: '2023',
        color: 'text-blue-400',
      },
    }),
    prisma.funding.create({
      data: {
        title: 'IIC Prototype Fund',
        agency: 'Institution Innovation Council',
        via: 'IIEST Shibpur',
        year: '2022-Present',
        color: 'text-indigo-400',
      },
    }),
  ]);

  console.log('Created funding:', funding.length);

  // Seed Awards
  const awards = await Promise.all([
    prisma.award.create({
      data: {
        title: 'IEEE R10 WIE Hackathon Winner',
        description: 'Smart Resource Management',
        year: '2023',
        emoji: '🏆',
      },
    }),
    prisma.award.create({
      data: {
        title: 'AEGIS GRAHAM BELL Award',
        description: 'Top 3 Global Finalist',
        year: '2024',
        emoji: '🥇',
      },
    }),
    prisma.award.create({
      data: {
        title: 'Photography Competition Winner',
        description: 'Botanical Survey of India',
        year: '2022, 2023',
        emoji: '📸',
      },
    }),
  ]);

  console.log('Created awards:', awards.length);

  // Seed Memberships
  const memberships = await Promise.all([
    prisma.membership.create({
      data: {
        org: 'Optical Society of India (OSI)',
        type: 'Life Member',
      },
    }),
    prisma.membership.create({
      data: {
        org: 'Material Science India (MSI)',
        type: 'Life Member',
      },
    }),
  ]);

  console.log('Created memberships:', memberships.length);

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
