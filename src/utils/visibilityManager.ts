// utils/visibilityManager.ts
import { VisibilityRules } from '@/types/visibility';

class VisibilityManager {
    private visibleComponents: Set<string> = new Set();
    private hiddenComponents: Set<string> = new Set();
    private conversationStarted: boolean = false;
  
    applyVisibilityRules(rules: VisibilityRules) {
      if (rules.showComponents) {
        rules.showComponents.forEach(comp => {
          this.visibleComponents.add(comp);
          this.hiddenComponents.delete(comp);
        });
      }
      if (rules.hideComponents) {
        rules.hideComponents.forEach(comp => {
          this.hiddenComponents.add(comp);
          this.visibleComponents.delete(comp);
        });
      }
    }

    startConversation() {
        this.conversationStarted = true;
        this.visibleComponents.clear();
    }

    updateVisibleComponents(components: string[]) {
        components.forEach(comp => this.visibleComponents.add(comp));
    }

    isComponentVisible(componentName: string): boolean {
        return this.conversationStarted && this.visibleComponents.has(componentName);
    }
}

export const visibilityManager = new VisibilityManager();
