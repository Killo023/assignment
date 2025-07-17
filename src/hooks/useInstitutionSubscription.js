import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';

export function useInstitutionSubscription() {
  const { data: session } = useSession();
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSubscription = async () => {
      if (!session?.user?.email) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/institution/subscription-status');
        if (response.ok) {
          const data = await response.json();
          setSubscriptionStatus(data.subscription);
        } else {
          setSubscriptionStatus('free');
        }
      } catch (error) {
        console.error('Error checking institution subscription:', error);
        setSubscriptionStatus('free');
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [session]);

  const isPremium = subscriptionStatus === 'premium';
  const isCancelled = subscriptionStatus === 'cancelled';

  // Feature access control - Updated to allow more features on free tier
  const canAccessFeature = (feature) => {
    if (isPremium && !isCancelled) return true;
    
    // Free features - Limited list
    const freeFeatures = ['classes', 'settings', 'assignments'];
    return freeFeatures.includes(feature);
  };

  const canCreateClass = () => {
    if (isPremium && !isCancelled) return true;
    // Free users can create up to 2 classes
    return true;
  };

  // Updated access control - assignments free, grading premium only
  const canAccessAnalytics = () => isPremium && !isCancelled;
  const canAccessPlagiarism = () => isPremium && !isCancelled;
  const canAccessGrading = () => isPremium && !isCancelled; // Premium only
  const canAccessAssignments = () => true; // Free for all users

  return {
    subscriptionStatus,
    loading,
    isPremium,
    isCancelled,
    canAccessFeature,
    canCreateClass,
    canAccessAnalytics,
    canAccessPlagiarism,
    canAccessGrading,
    canAccessAssignments
  };
} 