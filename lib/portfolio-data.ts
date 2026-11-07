export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'distributed' | 'robotics' | 'fullstack' | 'ml';
  categoryLabel: string;
  description: string;
  architectureDetails: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  image: string;
  githubUrl: string;
  demoUrl: string;
  featured: boolean;
  year: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: { name: string; level: number; note: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: 'internship' | 'research' | 'leadership';
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  gpa: string;
  honors: string[];
  coursework: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: 'Divya Bharat',
    role: '4th-Year Computer Science & Engineering Student',
    focus: 'Distributed Systems · Robotics & Autonomous Control · Cloud Infrastructure',
    institution: 'National Institute of Technology',
    graduationYear: 2027,
    expectedGraduation: 'May 2027',
    gpa: '3.92 / 4.00',
    rank: 'Top 2% Departmental Standing',
    email: 'divyabharat1407@gmail.com',
    location: 'Bangalore, India · Open to Relocation',
    availability: 'Available for Full-Time Roles starting Summer 2027',
    avatar: '/images/divya_bharat_avatar_1793892212028.jpg',
    github: 'https://github.com/divyabharat',
    linkedin: 'https://linkedin.com/in/divyabharat',
    bio: 'Senior engineering undergraduate focused on designing deterministic distributed protocols, real-time robotics telemetry, and high-concurrency systems. Passionate about bridging theoretical algorithmic foundations with low-latency production software.',
  },
  metrics: [
    { label: 'Cumulative GPA', value: '3.92', subtext: 'Out of 4.00 Scale' },
    { label: 'Shipped Systems', value: '18+', subtext: 'Open Source & Prototypes' },
    { label: 'Max Throughput', value: '1.2M', subtext: 'QPS on Distributed Cache' },
    { label: 'Graduation', value: 'Class of 2027', subtext: 'B.Tech Comp Sci & Eng' },
  ],
  projects: [
    {
      id: 'aether-cache',
      title: 'AetherCache',
      tagline: 'High-throughput distributed in-memory cache with Raft consensus',
      category: 'distributed',
      categoryLabel: 'Distributed Systems',
      description:
        'Engineered an in-memory distributed cache cluster using Go and Rust featuring a partitioned hash ring, Raft consensus for leader election, and custom zero-copy ring buffers for network packet serialization.',
      architectureDetails: [
        'Implements consistent hashing with virtual nodes to minimize rebalancing overhead during cluster membership changes.',
        'Custom TCP framed binary protocol achieving 3.8x lower latency compared to standard JSON-over-HTTP payloads.',
        'Zero-allocation read-path utilizing jemalloc and shared memory mappings for telemetry buffers.',
      ],
      metrics: [
        { label: 'P99 Latency', value: '0.42 ms' },
        { label: 'Peak QPS', value: '1,240,000' },
        { label: 'Nodes Scaled', value: '64' },
      ],
      tags: ['Rust', 'Go', 'Raft', 'gRPC', 'Distributed Systems', 'Linux IO'],
      image: '/images/project_neural_cache_1793892213317.jpg',
      githubUrl: 'https://github.com/divyabharat/aether-cache',
      demoUrl: '#demo-aether',
      featured: true,
      year: '2026',
    },
    {
      id: 'aegis-rover',
      title: 'Aegis Rover-1',
      tagline: 'Autonomous planetary research rover SLAM & sensor fusion pipeline',
      category: 'robotics',
      categoryLabel: 'Robotics & Control',
      description:
        'Built an end-to-end autonomous navigation stack for an engineering rover utilizing LiDAR point-cloud registration, stereo visual odometry, and an Extended Kalman Filter (EKF) for GPS-denied environments.',
      architectureDetails: [
        'Integrated Velodyne LiDAR and ZED2 stereoscopic depth sensors via ROS2 humble nodes running on an NVIDIA Jetson AGX Orin.',
        'Developed custom OctoMap 3D voxel occupancy grids supporting dynamic multi-level obstacle detection at 30 Hz.',
        'Implemented dynamic trajectory rollout using Model Predictive Control (MPC) with actuator acceleration bounds.',
      ],
      metrics: [
        { label: 'Odometry Drift', value: '< 1.2%' },
        { label: 'Loop Rate', value: '50 Hz' },
        { label: 'Obstacle Radius', value: '0.15 m' },
      ],
      tags: ['C++', 'Python', 'ROS2', 'LiDAR', 'SLAM', 'NVIDIA Jetson', 'MPC'],
      image: '/images/project_autonomous_rover_1793892214489.jpg',
      githubUrl: 'https://github.com/divyabharat/aegis-rover-slam',
      demoUrl: '#demo-rover',
      featured: true,
      year: '2026',
    },
    {
      id: 'synapse-canvas',
      title: 'SynapseCanvas',
      tagline: 'Real-time collaborative systems architecture diagramming engine',
      category: 'fullstack',
      categoryLabel: 'Full-Stack Architecture',
      description:
        'Created a high-performance web-based architecture design workspace with peer-to-peer real-time synchronization using Conflict-free Replicated Data Types (CRDTs) and high-density WebGL node rendering.',
      architectureDetails: [
        'Built with Yjs CRDTs over WebSockets with optimistic local updates for sub-10ms perception latency.',
        'Custom WebGL and Canvas renderer capable of rendering over 10,000 interactive nodes and edge bezier connections at 60 FPS.',
        'Deterministic state snapshotting and undo/redo tree history stored on transactional PostgreSQL backends.',
      ],
      metrics: [
        { label: 'Active Nodes', value: '10,000+' },
        { label: 'Sync Latency', value: '< 18 ms' },
        { label: 'Concurrent Peers', value: '100+' },
      ],
      tags: ['TypeScript', 'Next.js', 'WebGL', 'CRDT', 'WebSockets', 'PostgreSQL'],
      image: '/images/project_collaborative_canvas_1793892214391.jpg',
      githubUrl: 'https://github.com/divyabharat/synapse-canvas',
      demoUrl: '#demo-canvas',
      featured: true,
      year: '2025',
    },
    {
      id: 'hyperion-edge-ml',
      title: 'Hyperion Edge-ML',
      tagline: 'Quantized neural telemetry engine for resource-constrained microcontrollers',
      category: 'ml',
      categoryLabel: 'Embedded AI',
      description:
        'Designed an automated quantization and pruning compiler that compresses recurrent sensor models for real-time vibration anomaly detection on ARM Cortex-M4 and ESP32 hardware.',
      architectureDetails: [
        'INT8 post-training quantization pipeline preserving 99.1% of FP32 baseline F1-score while cutting memory footprint by 74%.',
        'Direct DMA audio/vibration streaming into double-buffered tensor inference loops with zero CPU spinlocking.',
        'Continuous thermal compensation calibrating sensor baseline drift over 120-hour operational cycles.',
      ],
      metrics: [
        { label: 'RAM Footprint', value: '48 KB' },
        { label: 'Inference Latency', value: '4.8 ms' },
        { label: 'Model Accuracy', value: '98.4%' },
      ],
      tags: ['Embedded C', 'PyTorch', 'TensorRT', 'Microcontrollers', 'DSP'],
      image: '/images/project_neural_cache_1793892213317.jpg',
      githubUrl: 'https://github.com/divyabharat/hyperion-edge-ml',
      demoUrl: '#demo-hyperion',
      featured: false,
      year: '2025',
    },
  ] as Project[],
  skills: [
    {
      id: 'systems',
      title: 'Systems & Core Languages',
      description: 'Low-level performance, memory safety, and concurrent programming',
      skills: [
        { name: 'Rust', level: 90, note: 'Ownership semantics, async Tokio, FFI, zero-copy I/O' },
        { name: 'Go', level: 92, note: 'Goroutines, channels, gRPC, microservices, Raft implementations' },
        { name: 'C / C++', level: 86, note: 'Memory allocation, POSIX APIs, pointers, embedded hardware' },
        { name: 'TypeScript', level: 94, note: 'Strict typing, modern React, Next.js, Node.js engines' },
        { name: 'Python', level: 88, note: 'NumPy, PyTorch, scientific computing, automation scripts' },
      ],
    },
    {
      id: 'distributed',
      title: 'Distributed Systems & Cloud',
      description: 'High-availability infrastructure, consensus protocols, and persistence',
      skills: [
        { name: 'Distributed Consensus', level: 88, note: 'Raft, Paxos concepts, split-brain mitigation, quorum' },
        { name: 'gRPC & Protocol Buffers', level: 92, note: 'Bidirectional streaming, schema evolution, high-throughput RPC' },
        { name: 'PostgreSQL & SQL', level: 89, note: 'Indexing, query optimization, connection pooling, ACID transactions' },
        { name: 'Redis & Caching', level: 90, note: 'Cluster mode, pub/sub, Lua scripting, eviction policies' },
        { name: 'Docker & Kubernetes', level: 84, note: 'Containerization, pod lifecycle, Helm charts, ingress' },
        { name: 'Linux Kernel & Internals', level: 85, note: 'eBPF basics, epoll, cgroups, network namespaces, perf' },
      ],
    },
    {
      id: 'frontend3d',
      title: 'Frontend, WebGL & 3D Math',
      description: 'Interactive user interfaces, spatial graphics, and physics',
      skills: [
        { name: 'Three.js & WebGL', level: 88, note: 'Scene graphs, custom shaders, procedural geometries, PBR lighting' },
        { name: 'Next.js 15 & React 19', level: 94, note: 'App router, server components, suspense, state architecture' },
        { name: 'Tailwind CSS', level: 95, note: 'Modern utility layout, responsive systems, design tokens' },
        { name: 'Motion / Animations', level: 90, note: 'Physics-based spring motion, layout transitions, keyframes' },
        { name: 'Canvas API & 2D Math', level: 87, note: 'Transform matrices, bezier curves, spatial indexing' },
      ],
    },
    {
      id: 'robotics',
      title: 'Robotics & Machine Learning',
      description: 'Kinematics, sensor fusion, computer vision, and model deployment',
      skills: [
        { name: 'ROS2 & Navigation', level: 85, note: 'Publish/subscribe, action servers, TF2 transforms, Nav2' },
        { name: 'LiDAR & Point Clouds', level: 82, note: 'PCL library, voxel grid filtering, Euclidean clustering' },
        { name: 'PyTorch & Edge ML', level: 84, note: 'Model training, quantization, ONNX export, TensorRT inference' },
        { name: 'OpenCV & Vision', level: 86, note: 'Feature extraction, camera calibration, stereo disparity' },
      ],
    },
  ] as SkillCategory[],
  experiences: [
    {
      id: 'exp-1',
      role: 'Systems Engineering Intern',
      organization: 'Apex HyperCloud Systems',
      location: 'Bangalore, India',
      period: 'May 2026 – Aug 2026',
      type: 'internship',
      highlights: [
        'Architected an asynchronous gRPC reverse proxy in Go handling over 450,000 requests/sec with dynamic health checking.',
        'Reduced 99th percentile HTTP/2 connection handoff latency by 34% by redesigning epoll socket listener pools on Linux.',
        'Implemented distributed tracing hooks utilizing OpenTelemetry and Grafana Tempo across 12 microservices.',
      ],
      technologies: ['Go', 'gRPC', 'Linux epoll', 'OpenTelemetry', 'Docker', 'Prometheus'],
    },
    {
      id: 'exp-2',
      role: 'Undergraduate Robotics Research Fellow',
      organization: 'Autonomous Systems & Perception Lab',
      location: 'Department of Computer Science',
      period: 'Aug 2025 – Present',
      type: 'research',
      highlights: [
        'Co-authored research on real-time stereo-vision depth filtering under adverse lighting conditions using NVIDIA Jetson Orin.',
        'Engineered hardware-in-the-loop (HIL) simulation testbeds in Gazebo for autonomous ground rover path generation.',
        'Mentored 6 junior undergraduate engineering students in ROS2 architecture and differential drive kinematics.',
      ],
      technologies: ['C++', 'ROS2', 'Gazebo', 'OpenCV', 'CUDA', 'Python'],
    },
    {
      id: 'exp-3',
      role: 'Lead Software Architect',
      organization: 'University Satellite Ground Station Club',
      location: 'Campus Engineering Guild',
      period: 'Jan 2024 – Present',
      type: 'leadership',
      highlights: [
        'Engineered an automated Doppler-corrected UHF packet telemetry demodulation pipeline decoding orbital CubeSat beacon packets.',
        'Created a high-reliability WebSockets mission control dashboard visualizing antenna azimuth/elevation angles in real-time.',
        'Organized the Annual 48-Hour Systems Hackathon with 400+ participating engineering students nationwide.',
      ],
      technologies: ['Rust', 'Python', 'WebSockets', 'Next.js', 'Radio Frequency DSP'],
    },
  ] as ExperienceItem[],
  education: {
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    institution: 'National Institute of Technology',
    period: '2023 – 2027 (Expected Graduation May 2027)',
    gpa: '3.92 / 4.00 (Class Rank: 4 / 210)',
    honors: [
      "Dean's Academic Excellence Honor Roll (All semesters 2023–2026)",
      'Winner, National Autonomous Robotics Challenge 2025',
      'ACM Student Chapter Technical Lead (2025–2026)',
    ],
    coursework: [
      'Distributed Computing Systems',
      'Operating Systems & Kernel Design',
      'Advanced Data Structures & Algorithms',
      'Computer Architecture & Microprocessors',
      'Database Management Systems',
      'Robotics Perception & Kinematics',
      'Computer Networks & Protocols',
      'Compiler Construction',
    ],
  } as EducationItem,
  certifications: [
    { title: 'AWS Certified Solutions Architect – Associate', issuer: 'Amazon Web Services', year: '2025' },
    { title: 'Deep Learning & Neural Network Specialization', issuer: 'DeepLearning.AI', year: '2024' },
    { title: 'Linux Foundation Certified System Administrator (LFCS prep)', issuer: 'Linux Foundation', year: '2025' },
  ],
};
