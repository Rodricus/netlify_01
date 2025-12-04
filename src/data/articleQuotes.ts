// Article quotes mapped to each layer
export const articleQuotes = {
    layer1: {
        title: "Raw Input",
        quote: "Every prompt is a fresh invocation, every answer contextually isolated."
    },

    layer2: {
        title: "Tokenization",
        quote: "Trained on vast corpora, they learn token-level probabilities that allow them to generate text that appears fluent, coherent, even thoughtful."
    },

    layer3: {
        title: "Embeddings",
        quote: "While transformer architectures attend over a sliding context window, they do not preserve memory across interactions. They simulate continuity through token co-occurrence, not through persistent internal state."
    },

    layer4: {
        title: "Semantic Search",
        quote: "To fake memory, developers bolt on retrieval systems: embedding stores, vector databases, session logs. But this is not memory in the cognitive sense. It is record look-up dressed as recollection."
    },

    layer5: {
        title: "Context Injection (MCP)",
        quote: "MCP is an open protocol for communicating between an LLM and its external scaffolding... It formalises how context is packaged and passed back into the model."
    },

    layer6: {
        title: "LangChain Orchestration",
        quote: "LangChain exists because LLMs, on their own, forget everything and understand nothing. LangChain is not a mind. It is not reasoning. It is a library: a Python wrapper that gives structure to the illusion of cognition by chaining LLM outputs through pre-defined workflows."
    },

    layer7: {
        title: "Attention Mechanism",
        quote: "LLMs optimise locally. They predict the next token based on what came before, nothing more. They do not hold a map. They do not backtrack. They do not know what the paragraph is 'about.'"
    },

    layer8: {
        title: "Next-Token Prediction",
        quote: "The transformer does not pursue a goal, it optimizes a probability distribution. Your prompt is parsed into tokens, mapped through attention layers, and decoded into the next most likely token. There is no telos, no 'why,' just next."
    },

    layer9: {
        title: "Detokenization",
        quote: "What feels like reasoning is really surface-level alignment between your input and high-probability continuations, modulated by context windows and reinforcement learning post-processing (RLHF)."
    },

    layer10: {
        title: "Post-Processing",
        quote: "The illusion of reasoning arises from the symmetry of structure, not the presence of thought. The model has no preference. It has no epistemology. It does not 'believe' what it says."
    }
}
