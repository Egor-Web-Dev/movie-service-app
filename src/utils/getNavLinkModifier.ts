const getNavLinkModifier = (defaultClassName: string) => {
  return ({ isActive }: { isActive: boolean }) => {
    if (isActive) return `${defaultClassName} nav-link--active`;
    return defaultClassName;
  };
};

export default getNavLinkModifier;
