import React from 'react';
import { Route, Switch } from 'wouter';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Home } from './pages/Home';
import { ChannelDetails } from './pages/ChannelDetails';
import { Navbar } from './components/Navbar';
import { GradientBackground } from './components/GradientBackground';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GradientBackground>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/channel/:id" component={ChannelDetails} />
          </Switch>
        </main>
      </GradientBackground>
    </QueryClientProvider>
  );
}