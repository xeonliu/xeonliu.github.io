// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "about",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-blog",
          title: "blog",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/blog/";
          },
        },{id: "nav-cinema",
          title: "cinema",
          description: "",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cinema/";
          },
        },{id: "post-async-flow",
        
          title: "Async Flow",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/Async-Flow/";
          
        },
      },{id: "post-areal",
        
          title: "Areal",
        
        description: "",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2026/AReal/";
          
        },
      },{id: "post-阅读-distserve-论文",
        
          title: "阅读 DistServe 论文",
        
        description: "distserve",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/distserve/";
          
        },
      },{id: "post-阅读-orca-论文",
        
          title: "阅读 Orca 论文",
        
        description: "AI Infra",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/orca/";
          
        },
      },{id: "post-阅读-paged-attention-论文",
        
          title: "阅读 Paged Attention 论文",
        
        description: "core of vllm",
        section: "Posts",
        handler: () => {
          
            window.location.href = "/blog/2025/pa/";
          
        },
      },{id: "books-the-battle-of-algiers",
          title: 'The Battle of Algiers',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/algiers/";
            },},{id: "books-a-one-and-a-two",
          title: 'A One and A Two',
          description: "",
          section: "Books",handler: () => {
              window.location.href = "/books/yiyi/";
            },},{id: "news-the-site-is-built-sparkles-smile",
          title: 'The site is built! :sparkles: :smile:',
          description: "",
          section: "News",},{id: "projects-project-1",
          title: 'project 1',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_project/";
            },},{id: "projects-project-2",
          title: 'project 2',
          description: "a project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_project/";
            },},{id: "projects-project-3-with-very-long-name",
          title: 'project 3 with very long name',
          description: "a project that redirects to another website",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_project/";
            },},{id: "projects-project-4",
          title: 'project 4',
          description: "another without an image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_project/";
            },},{id: "projects-project-5",
          title: 'project 5',
          description: "a project with a background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/5_project/";
            },},{id: "projects-project-6",
          title: 'project 6',
          description: "a project with no image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/6_project/";
            },},{id: "projects-project-7",
          title: 'project 7',
          description: "with background image",
          section: "Projects",handler: () => {
              window.location.href = "/projects/7_project/";
            },},{id: "projects-project-8",
          title: 'project 8',
          description: "an other project with a background image and giscus comments",
          section: "Projects",handler: () => {
              window.location.href = "/projects/8_project/";
            },},{id: "projects-project-9",
          title: 'project 9',
          description: "another project with an image 🎉",
          section: "Projects",handler: () => {
              window.location.href = "/projects/9_project/";
            },},{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/xeonliu", "_blank");
        },
      },{
        id: 'social-rss',
        title: 'RSS Feed',
        section: 'Socials',
        handler: () => {
          window.open("/feed.xml", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
