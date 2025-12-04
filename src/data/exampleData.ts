export const tokyoTripExample = {
    userMessage: "Plan a 3-day trip to Tokyo",

    // Layer 1: Raw Input
    layer1_rawInput: {
        user_message: "Plan a 3-day trip to Tokyo",
        timestamp: "2024-01-15T10:30:00Z",
        session_id: null
    },

    // Layer 2: Tokenization (Encode)
    layer2_tokenization: {
        input_text: "Plan a 3-day trip to Tokyo",
        token_ids: [21119, 257, 513, 12, 820, 5296, 284, 11790],
        tokens: ["Plan", " a", " 3", "-", "day", " trip", " to", " Tokyo"],
        encoding_method: "tiktoken (cl100k_base)",
        vocab_size: 100000,
        code: `# Tokenization using tiktoken
import tiktoken

encoder = tiktoken.get_encoding("cl100k_base")
text = "Plan a 3-day trip to Tokyo"
token_ids = encoder.encode(text)
# Output: [21119, 257, 513, 12, 820, 5296, 284, 11790]`
    },

    // Layer 3: Embedding Layer
    layer3_embeddings: {
        token_ids: [21119, 257, 513, 12, 820, 5296, 284, 11790],
        embedding_dim: 12288,
        sample_embedding: {
            token_21119_Plan: [0.023, -0.145, 0.089, "...(12285 more)"],
            token_11790_Tokyo: [0.167, -0.034, 0.201, "...(12285 more)"]
        },
        explanation: "Each token ID is converted to a 12,288-dimensional vector that captures semantic meaning",
        shape: [8, 12288],
        code: `# Embedding layer
embeddings = model.embed_tokens(token_ids)
# Shape: [8 tokens, 12288 dimensions]
# Each token becomes a dense vector representation`
    },

    // Layer 4: Semantic Search (Vector Similarity)
    layer4_semanticSearch: {
        query_embedding: "embedding_of('Tokyo trip')",
        search_method: "cosine_similarity",
        top_k: 5,
        retrieved_docs: [
            { id: "doc_47", similarity: 0.89, snippet: "User previously mentioned: likes museums and traditional food" },
            { id: "doc_23", similarity: 0.82, snippet: "Travel preferences: morning activities, cultural sites" },
            { id: "doc_91", similarity: 0.78, snippet: "Previous trip to Kyoto, enjoyed temples" },
            { id: "doc_15", similarity: 0.71, snippet: "Budget range: moderate" },
            { id: "doc_62", similarity: 0.68, snippet: "Timezone: GMT+1" }
        ],
        code: `# Vector similarity search
from numpy import dot
from numpy.linalg import norm

def cosine_similarity(a, b):
    return dot(a, b) / (norm(a) * norm(b))

query_vec = embed("Tokyo trip")
results = []
for doc in vector_db:
    sim = cosine_similarity(query_vec, doc.embedding)
    results.append((doc, sim))
    
top_5 = sorted(results, key=lambda x: x[1], reverse=True)[:5]`
    },

    // Layer 5: Context Injection (MCP)
    layer5_contextInjection: {
        retrieved_context: [
            "User previously mentioned: likes museums and traditional food",
            "Travel preferences: morning activities, cultural sites",
            "Previous trip to Kyoto, enjoyed temples",
            "Timezone: GMT+1"
        ],
        injected_into_prompt: true,
        source: "Model Context Protocol (MCP)",
        mcp_structure: {
            user_input: "Plan a 3-day trip to Tokyo",
            system_state: "conversation_turn_3",
            memory_objects: ["user_preferences", "travel_history"],
            tool_use: null,
            context_graph: "preference_nodes → travel_query"
        },
        code: `# MCP Context Assembly
context = {
    "user_input": user_message,
    "memory": retrieve_from_vector_db(query_embedding),
    "system_state": session.state,
    "timestamp": session.timestamp
}
enriched_prompt = assemble_prompt(context)`
    },

    // Layer 6: Task Decomposition (LangChain)
    layer6_taskDecomposition: {
        orchestrator: "LangChain",
        steps: [
            "understand_user_intent",
            "retrieve_tokyo_attractions",
            "create_daily_itinerary",
            "format_response"
        ],
        chain_type: "SequentialChain",
        code: `# LangChain Orchestration
from langchain.chains import SequentialChain

tasks = [
    ("understand_intent", IntentChain()),
    ("retrieve_data", RetrievalChain()),
    ("plan_itinerary", PlanningChain()),
    ("format_output", FormattingChain())
]

chain = SequentialChain(chains=tasks)
result = chain.run(user_input=enriched_prompt)`
    },

    // Layer 7: Attention Mechanism & Transformer
    layer7_attention: {
        mechanism: "Multi-Head Self-Attention",
        num_heads: 96,
        num_layers: 96,
        context_window: 128000,
        attention_pattern: "Each token attends to all previous tokens in context",
        explanation: "The transformer calculates attention scores between tokens to understand relationships and dependencies",
        code: `# Simplified Attention Mechanism
Q = embeddings @ W_query  # Query matrix
K = embeddings @ W_key    # Key matrix  
V = embeddings @ W_value  # Value matrix

attention_scores = (Q @ K.T) / sqrt(d_k)
attention_weights = softmax(attention_scores)
output = attention_weights @ V

# This happens 96 times (num_heads) per layer
# Across 96 layers in GPT-4`
    },

    // Layer 8: Next-Token Prediction
    layer8_prediction: {
        vocab_size: 100000,
        temperature: 0.7,
        top_p: 0.9,
        output_logits: {
            sample_tokens: [
                { token: "Day", logit: 8.23, probability: 0.1205 },
                { token: "Here", logit: 7.91, probability: 0.0891 },
                { token: "I", logit: 7.54, probability: 0.0623 },
                { token: "**", logit: 7.12, probability: 0.0445 }
            ]
        },
        selected_tokens: [12410, 352, 25, 7437, 1938, 40000, 9656, 329],
        code: `# Next-Token Prediction
logits = transformer_output  # [vocab_size] probabilities
probs = softmax(logits / temperature)

# Top-p (nucleus) sampling
sorted_probs = sort(probs, descending=True)
cumsum = cumulative_sum(sorted_probs)
top_p_mask = cumsum <= 0.9

# Sample from top-p tokens
next_token = sample(probs[top_p_mask])`
    },

    // Layer 9: Detokenization (Decode)
    layer9_detokenization: {
        token_ids: [12410, 352, 25, 7437, 1938, 40000, 9656, 329, 4713, 17032],
        decoded_text: "day one could start early with tsukiji market for fresh sushi breakfast then visit the tokyo national museum",
        decoding_method: "tiktoken (cl100k_base)",
        code: `# Detokenization
import tiktoken

decoder = tiktoken.get_encoding("cl100k_base")
token_ids = [12410, 352, 25, 7437, ...]
text = decoder.decode(token_ids)
# Output: "day one could start early with..."`
    },

    // Layer 10: Post-Processing & Formatting
    layer10_postProcessing: {
        raw_output: "day one could start early with tsukiji market for fresh sushi breakfast then visit the tokyo national museum in ueno park afternoon explore asakusa sensoji temple",
        formatted_output: "**Day 1: Traditional Tokyo**\\n- Morning: Tsukiji Market for fresh sushi breakfast\\n- Midday: Tokyo National Museum in Ueno Park\\n- Afternoon: Asakusa and Sensoji Temple",
        formatting_rules: [
            "Capitalize proper nouns",
            "Add markdown formatting",
            "Structure with bullet points",
            "Add descriptive headers",
            "Ensure consistent tense"
        ],
        code: `# Post-processing
def format_response(raw_text):
    # Capitalize sentences
    formatted = capitalize_sentences(raw_text)
    
    # Add structure
    formatted = add_markdown_headers(formatted)
    formatted = create_bullet_points(formatted)
    
    # Clean up
    formatted = fix_spacing(formatted)
    formatted = ensure_consistency(formatted)
    
    return formatted`
    },

    finalResponse: `**Day 1: Traditional Tokyo**
- Morning: Tsukiji Market for fresh sushi breakfast
- Midday: Tokyo National Museum in Ueno Park
- Afternoon: Asakusa and Sensoji Temple

**Day 2: Modern Tokyo**
- Morning: Shibuya and Harajuku
- Midday: Meiji Shrine
- Afternoon: teamLab Borderless Digital Art Museum

**Day 3: Cultural Deep Dive**
- Morning: Imperial Palace Gardens
- Afternoon: Akihabara electronics and anime district
- Evening: Dinner in Shinjuku's Omoide Yokocho alley`
}
