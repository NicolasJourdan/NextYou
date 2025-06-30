'use client';

import { Button, Card, CardBody, CardHeader, Chip } from "@heroui/react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            NextYou
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Application Progressive Web App moderne avec HeroUI
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              color="primary" 
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Commencer
            </Button>
            <Button 
              variant="bordered" 
              size="lg"
            >
              En savoir plus
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  📱
                </div>
                <h3 className="text-lg font-semibold">PWA Ready</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 dark:text-gray-300">
                Installation sur l&apos;écran d&apos;accueil et fonctionnement hors ligne
              </p>
            </CardBody>
          </Card>

          <Card className="p-6">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  ⚡
                </div>
                <h3 className="text-lg font-semibold">Performance</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 dark:text-gray-300">
                Chargement ultra-rapide avec Next.js 15 et Turbopack
              </p>
            </CardBody>
          </Card>

          <Card className="p-6">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                  🎨
                </div>
                <h3 className="text-lg font-semibold">HeroUI</h3>
              </div>
            </CardHeader>
            <CardBody>
              <p className="text-gray-600 dark:text-gray-300">
                Interface moderne et accessible avec HeroUI
              </p>
            </CardBody>
          </Card>
        </div>

        {/* Status */}
        <div className="text-center">
          <div className="flex gap-2 justify-center mb-4">
            <Chip color="success" variant="flat">Next.js 15</Chip>
            <Chip color="primary" variant="flat">HeroUI</Chip>
            <Chip color="secondary" variant="flat">PWA</Chip>
            <Chip color="warning" variant="flat">Docker</Chip>
          </div>
          <p className="text-sm text-gray-500">
            Prêt pour la production 🚀
          </p>
        </div>
      </div>
    </main>
  );
}
