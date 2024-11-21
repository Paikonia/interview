import { Request, Response, NextFunction } from 'express';
import AccountSubscription from '../../database/models/AccountSubscription';
import Subscription from '../../database/models/Subscription';

const featureAccessControl = (requiredPlan: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // query AccountSubscription and include the Subscription model
      const userSubscription = await AccountSubscription.findOne({
        where: { business_id: req.user.id },
        include: [
          {
            model: Subscription,   // include Subscription model
            as: 'subscription'     // use correct alias defined in index.ts
          }
        ]
      });

      if (!userSubscription || !userSubscription.subscription) {
        return res.status(403).json({ message: 'Subscription required' });
      }

      // access the plan name from the included Subscription model
      const currentPlan = userSubscription.subscription.name;
      const allowedPlans = ['Free', 'Basic', 'Standard', 'Premium'];
      const requiredIndex = allowedPlans.indexOf(requiredPlan);
      const currentIndex = allowedPlans.indexOf(currentPlan);

      if (currentIndex < requiredIndex) {
        return res.status(403).json({ message: `Upgrade to ${requiredPlan} required` });
      }

      next();
    } catch (error) {
      console.error('Error in feature access control:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};

export { featureAccessControl };
